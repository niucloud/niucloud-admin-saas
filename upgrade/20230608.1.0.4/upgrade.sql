
ALTER TABLE `{{prefix}}wechat_reply` MODIFY COLUMN create_time INT NOT NULL DEFAULT 0 COMMENT '创建时间';

ALTER TABLE `{{prefix}}wechat_reply` MODIFY COLUMN update_time INT NOT NULL DEFAULT 0 COMMENT '更新时间';

ALTER TABLE `{{prefix}}wechat_reply` MODIFY COLUMN delete_time INT NOT NULL DEFAULT 0 COMMENT '删除时间';

DROP TABLE IF EXISTS `{{prefix}}site_account_log`;
CREATE TABLE `{{prefix}}site_account_log` (
  id INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  site_id INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  type VARCHAR(255) NOT NULL DEFAULT 'pay' COMMENT '账单类型pay,refund,transfer',
  money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '交易金额',
  trade_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '对应类型交易单号',
  create_time VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '站点账单记录';

ALTER TABLE `{{prefix}}site` ADD COLUMN site_code VARCHAR(32) NOT NULL DEFAULT '' COMMENT '站点code码';

ALTER TABLE `{{prefix}}site` MODIFY site_code VARCHAR(32) NOT NULL DEFAULT '' COMMENT '站点code码' AFTER site_id;

ALTER TABLE `{{prefix}}recharge_order_item` CHANGE COLUMN create_time create_time INT NOT NULL DEFAULT 0 COMMENT '创建时间';

ALTER TABLE `{{prefix}}pay_transfer` ADD UNIQUE INDEX UK_ns_pay_transfer_transfer_no(transfer_no);

ALTER TABLE `{{prefix}}pay_refund` CHANGE COLUMN refund_no refund_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '退款单号';

ALTER TABLE `{{prefix}}pay_refund` CHANGE COLUMN out_trade_no out_trade_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '支付流水号';

ALTER TABLE `{{prefix}}pay_refund` CHANGE COLUMN type type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '支付方式';

ALTER TABLE `{{prefix}}pay_refund` CHANGE COLUMN reason reason VARCHAR(255) NOT NULL DEFAULT '' COMMENT '退款原因';

ALTER TABLE `{{prefix}}pay_refund` CHANGE COLUMN status status VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '支付状态（0.待退款 1. 退款中 2. 已退款 -1已关闭）';

ALTER TABLE `{{prefix}}pay_refund` ADD UNIQUE INDEX UK_ns_pay_refund_refund_no(refund_no);

ALTER TABLE `{{prefix}}pay_channel` CHANGE COLUMN type type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '支付类型';

ALTER TABLE `{{prefix}}pay_channel` CHANGE COLUMN channel channel VARCHAR(255) NOT NULL DEFAULT '' COMMENT '支付渠道';

ALTER TABLE `{{prefix}}pay_channel` MODIFY COLUMN site_id INT NOT NULL DEFAULT 1 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_cash_out_account` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_cash_out_account` MODIFY COLUMN member_id INT NOT NULL DEFAULT 0 COMMENT '会员id';

ALTER TABLE `{{prefix}}member` MODIFY COLUMN commission_cash_outing DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现中佣金';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN update_time update_time INT NOT NULL DEFAULT 0 COMMENT '修改时间';

ALTER TABLE `{{prefix}}diy_page` ADD COLUMN template VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板名称';

ALTER TABLE `{{prefix}}diy_page` ADD COLUMN mode VARCHAR(255) NOT NULL DEFAULT 'diy' COMMENT '页面展示模式，diy：自定义，fixed：固定';

ALTER TABLE `{{prefix}}diy_page` ADD COLUMN is_change INT(11) NOT NULL DEFAULT 0 COMMENT '数据是否发生过变化，1：变化了，2：没有';

ALTER TABLE `{{prefix}}diy_page` MODIFY template VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板名称' AFTER type;

ALTER TABLE `{{prefix}}diy_page` MODIFY mode VARCHAR(255) NOT NULL DEFAULT 'diy' COMMENT '页面展示模式，diy：自定义，fixed：固定' AFTER template;

ALTER TABLE `{{prefix}}diy_page` MODIFY is_change INT(11) NOT NULL DEFAULT 0 COMMENT '数据是否发生过变化，1：变化了，2：没有' AFTER is_default;

UPDATE `{{prefix}}diy_page` SET is_change = 1;

UPDATE `{{prefix}}site` SET site_code = (site_id + 1000000)*11+1;
