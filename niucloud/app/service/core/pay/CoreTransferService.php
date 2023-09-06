<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\pay;

use app\dict\pay\TransferDict;
use app\model\pay\Pay;
use app\model\pay\Transfer;
use core\base\BaseCoreService;
use core\exception\PayException;
use Exception;
use think\facade\Db;
use think\Model;
use Throwable;

/**
 * 支付转账服务层
 * Class CoreTransferService
 * @package app\service\core\pay
 */
class CoreTransferService extends BaseCoreService
{
    protected $pay_event;
    public function __construct()
    {
        parent::__construct();
        $this->model = new Transfer();
        $this->pay_event = new CorePayEventService();
    }

    /**
     * 创建转账单据
     * @param int $site_id
     * @param string $main_type
     * @param int $main_id
     * @param float $money
     * @param string $trade_type
     * @param string $remark
     * @return string|null
     * @throws Exception
     */
    public function create(int $site_id, string $main_type, int $main_id, float $money, string $trade_type, string $remark){
        $transfer_no = create_no();
        $transfer_data = array(
            'site_id' => $site_id,
            'money' => $money,
            'trade_type' => $trade_type,
            'transfer_no' => $transfer_no,
            'main_id' => $main_id,
            'main_type' => $main_type,
            'transfer_status' => TransferDict::WAIT,
            'remark' => $remark,
        );
        $this->model->create($transfer_data);
        return $transfer_no;
    }


    /**
     * 转账
     * @param int $site_id
     * @param string $transfer_no
     * @param string $transfer_type
     * @param array $data
     * @return true
     */
    public function transfer(int $site_id, string $transfer_no, string $transfer_type, array $data){
        $transfer = $this->findTransferByTransferNo($site_id, $transfer_no);

        if($transfer->isEmpty()) throw new PayException('TRANSFER_ORDER_INVALID');
        if(!in_array($transfer['transfer_status'], [TransferDict::WAIT, TransferDict::FAIL]))  throw new PayException('TRANFER_STATUS_NOT_IN_WAIT_TANSFER');

        $transfer_account = $data['transfer_account'] ?? '';
        $transfer_realname = $data['transfer_realname'] ?? '';
        $transfer_data = array(
            'transfer_type' => $transfer_type,//转账方式
            'transfer_realname' => $transfer_realname,//名称
            'transfer_mobile' => $data['transfer_mobile'] ?? '',//手机号
            'transfer_bank' => $data['transfer_bank'] ?? '',//转账银行
            'transfer_account' => $transfer_account,//转账账号
            'openid' => $data['openid'] ?? '',
            'transfer_voucher' => $data['transfer_voucher'] ?? '',
            'transfer_remark' => $data['transfer_remark'] ?? '',
        );
        $transfer->save($transfer_data);
        switch($transfer_type){
            case TransferDict::WECHAT:
                $transfer_account = $data['openid'];
                break;
        }
        $params = [];
        if(TransferDict::getTransferType()[$transfer_type]['is_online']){
            try {
                $result = $this->pay_event->init($site_id, 'transfer', $transfer_type)->transfer($transfer['money'], $transfer_no, $transfer_account, $transfer_realname, $transfer['remark']);
//                $params['batch_id'] = $result['batch_id'];
//                $params['out_batch_no'] = $result['out_batch_no'];
                //将返回的数据交给转账通知
                $this->transferNotify($site_id, $transfer_no, $result);
                return true;
            }catch( Throwable $e){
                $this->fail($site_id, $transfer_no, $transfer_type, ['reason' => get_lang($e->getMessage())]);
                throw new PayException($e->getMessage());
            }
        }
        $this->success($site_id, $transfer_no, $transfer_type, $params);
        return true;
    }
    /**
     * 通过转账单号查询转账
     * @param int $site_id
     * @param string $transfer_no
     * @return Pay|array|mixed|Model
     */
    public function findTransferByTransferNo(int $site_id, string $transfer_no){
        $where = array(
            ['site_id', '=', $site_id],
            ['transfer_no', '=', $transfer_no]
        );
        return $this->model->where($where)->findOrEmpty();
    }

    public function transferNotify(int $site_id, string $transfer_no, $params){
        $transfer = $this->findTransferByTransferNo($site_id, $transfer_no);

        if($transfer->isEmpty()) throw new PayException('TRANSFER_ORDER_INVALID');
        if(!in_array($transfer['transfer_status'], [TransferDict::WAIT, TransferDict::DEALING]))  throw new PayException('TRANFER_STATUS_NOT_IN_WAIT_TANSFER');
        $status = $params['status'] ?? TransferDict::DEALING;
        switch($status){
            case TransferDict::SUCCESS:
                $this->success($site_id, $transfer_no, $transfer->type);
                break;
            case TransferDict::DEALING:
                $this->dealing($site_id, $transfer_no, $transfer->type);
                break;
            case TransferDict::FAIL:
                $this->fail($site_id, $transfer_no, $transfer->type);
                break;
        }
        return true;
    }
    /**
     * 转账完成
     * @param int $site_id
     * @param string $transfer_no
     * @param string $transfer_type
     * @param array $params
     * @return bool
     */
    public function success(int $site_id, string $transfer_no, string $transfer_type, array $params = []){
        $transfer = $this->findTransferByTransferNo($site_id, $transfer_no);

        if($transfer->isEmpty()) throw new PayException('TRANSFER_ORDER_INVALID');
        if(!in_array($transfer['transfer_status'], [TransferDict::WAIT, TransferDict::DEALING]))  throw new PayException('TRANFER_STATUS_NOT_IN_WAIT_TANSFER');

        $trade_type = $transfer->trade_type;
        $data = array(
            'transfer_time' => time(),
            'transfer_status' => TransferDict::SUCCESS,
            'batch_id' => $params['batch_id'] ?? '',
            'out_batch_no' => $params['out_batch_no'] ?? '',
//            'transfer_type' => $transfer_type,
        );
        // 启动事务
        Db::startTrans();
        try {
            $transfer->save($data);
            $result = event('TransferSuccess', ['transfer_no' => $transfer_no, 'trade_type' => $trade_type, 'site_id' => $site_id]);
            if(!check_event_result($result)){
                return false;
            }
            // 提交事务
            Db::commit();
            return true;
        } catch ( Throwable $e) {
            // 回滚事务
            Db::rollback();
            throw new PayException($e->getMessage());
        }

    }

    /**
     * 转账失败
     * @param int $site_id
     * @param string $transfer_no
     * @param string $transfer_type
     * @param array $params
     * @return true
     */
    public function fail(int $site_id, string $transfer_no, string $transfer_type, array $params = []){
        $transfer = $this->findTransferByTransferNo($site_id, $transfer_no);

        if($transfer->isEmpty()) throw new PayException('TRANSFER_ORDER_INVALID');
        if(!in_array($transfer['transfer_status'], [TransferDict::WAIT, TransferDict::DEALING]))  throw new PayException('TRANFER_STATUS_NOT_IN_WAIT_TANSFER');
        $data = array(
            'transfer_time' => time(),
            'transfer_status' => TransferDict::FAIL,
            'transfer_fail_reason' => $params['reason']
//            'transfer_type' => $transfer_type,
        );
        //允许修改的值

        $transfer->save($data);
        return true;
    }


    public function check(int $site_id, array $data){
        $transfer_no = $data['transfer_no'];
        $transfer = $this->findTransferByTransferNo($site_id, $transfer_no);
        if($transfer->isEmpty()) throw new PayException('TRANSFER_ORDER_INVALID');
        if(!in_array($transfer['status'], [TransferDict::DEALING, TransferDict::WAIT]) )  throw new PayException('TRANFER_IS_CHANGE');//只有待转账和转账中的订单可以校验

        //查询第三方支付单据
        $transfer_info = $this->pay_event->init($site_id, $transfer->channel, $transfer->type)->getTransfer($transfer_no);
        if(empty($transfer_info)) throw new PayException('TRANSFER_ORDER_INVALID');//查询不到转账信息
        $status = $transfer_info['status'];
        switch($status){
            case TransferDict::SUCCESS:
                $this->success($site_id, $transfer_no, $transfer->type);
                break;
            case TransferDict::DEALING:
                $this->dealing($site_id, $transfer_no, $transfer->type);
                break;
            case TransferDict::FAIL:
                $this->fail($site_id, $transfer_no, $transfer->type);
                break;
        }
        return true;
    }

    /**
     * 处理中
     * @param int $site_id
     * @param $transfer_no
     * @param $type
     * @return true
     */
    public function dealing(int $site_id, $transfer_no, $type){
        $this->model->where([
            ['site_id', '=', $site_id],
            ['transfer_no', '=', $transfer_no]
        ])->update(
            [
                'status' => TransferDict::DEALING,
                'type' => $type
            ]
        );
        return true;
    }
}