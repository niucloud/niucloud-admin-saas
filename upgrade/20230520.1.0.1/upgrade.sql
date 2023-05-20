
DROP TABLE IF EXISTS `{{prefix}}member_withdraw`;

DROP TABLE IF EXISTS `{{prefix}}sys_message`;

DROP TABLE IF EXISTS `{{prefix}}sys_message_log`;

DROP TABLE IF EXISTS `{{prefix}}sys_message_sms_log`;

DROP TABLE IF EXISTS `{{prefix}}sys_notice_sms_log`;
CREATE TABLE `{{prefix}}sys_notice_sms_log` (
  id INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  site_id INT(11) NOT NULL DEFAULT 1,
  mobile VARCHAR(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  sms_type VARCHAR(32) NOT NULL DEFAULT '' COMMENT '发送关键字（注册、找回密码）',
  `key` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '发送关键字（注册、找回密码）',
  template_id VARCHAR(50) NOT NULL DEFAULT '',
  content VARCHAR(255) NOT NULL DEFAULT '' COMMENT '发送内容',
  params VARCHAR(255) NOT NULL DEFAULT '' COMMENT '数据参数',
  status VARCHAR(32) NOT NULL DEFAULT 'sending' COMMENT '发送状态：sending-发送中；success-发送成功；fail-发送失败',
  result TEXT DEFAULT NULL COMMENT '短信结果',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  send_time INT(11) NOT NULL DEFAULT 0 COMMENT '发送时间',
  update_time INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  delete_time INT(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '短信发送表';

DROP TABLE IF EXISTS `{{prefix}}sys_notice_log`;
CREATE TABLE `{{prefix}}sys_notice_log` (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '通知记录ID',
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点id',
  `key` VARCHAR(255) DEFAULT '' COMMENT '消息key',
  notice_type VARCHAR(50) DEFAULT 'sms' COMMENT '消息类型（sms,wechat.weapp）',
  uid INT(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '通知的用户id',
  member_id INT(11) NOT NULL DEFAULT 0 COMMENT '消息的会员id',
  nickname VARCHAR(255) NOT NULL DEFAULT '' COMMENT '接收人用户昵称或姓名',
  receiver VARCHAR(255) NOT NULL DEFAULT '' COMMENT '接收人（对应手机号，openid）',
  content TEXT DEFAULT NULL COMMENT '消息数据',
  is_click TINYINT(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击次数',
  is_visit TINYINT(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '访问次数',
  visit_time INT(11) NOT NULL DEFAULT 0 COMMENT '访问时间',
  create_time INT(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '消息时间',
  result VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '结果',
  params TEXT DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '通知记录表';

ALTER TABLE `{{prefix}}sys_notice_log` ADD INDEX member_id(member_id);

ALTER TABLE `{{prefix}}sys_notice_log` ADD INDEX message_key(`key`(191));

ALTER TABLE `{{prefix}}sys_notice_log` ADD INDEX uid(uid);

DROP TABLE IF EXISTS `{{prefix}}sys_notice`;
CREATE TABLE `{{prefix}}sys_notice` (
  id INT(11) NOT NULL AUTO_INCREMENT,
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点ID',
  `key` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '标识',
  sms_content TEXT DEFAULT NULL COMMENT '短信配置参数',
  is_wechat TINYINT(4) NOT NULL DEFAULT 0 COMMENT '公众号模板消息（0：关闭，1：开启）',
  is_weapp TINYINT(4) NOT NULL DEFAULT 0 COMMENT '小程序订阅消息（0：关闭，1：开启）',
  is_sms TINYINT(4) NOT NULL DEFAULT 0 COMMENT '发送短信（0：关闭，1：开启）',
  wechat_template_id VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信模版消息id',
  weapp_template_id VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信小程序订阅消息id',
  sms_id VARCHAR(255) NOT NULL DEFAULT '' COMMENT '短信id（对应短信配置）',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '添加时间',
  wechat_first VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信头部',
  wechat_remark VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信说明',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '通知模型';

ALTER TABLE `{{prefix}}sys_notice` ADD INDEX message_key(`key`, site_id);

ALTER TABLE `{{prefix}}sys_menu` ADD COLUMN addon VARCHAR(255) NOT NULL DEFAULT '' COMMENT '所属插件';

ALTER TABLE `{{prefix}}sys_config` ADD COLUMN addon VARCHAR(255) NOT NULL DEFAULT '' COMMENT '所属插件';

DROP TABLE IF EXISTS `{{prefix}}pay_refund`;
CREATE TABLE `{{prefix}}pay_refund` (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点id',
  refund_no VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '退款单号',
  out_trade_no VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '支付流水号',
  type VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '支付方式',
  channel VARCHAR(50) NOT NULL DEFAULT '' COMMENT '支付渠道',
  money DECIMAL(10, 2) NOT NULL COMMENT '支付金额',
  reason VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '退款原因',
  status VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '支付状态（0.待退款 1. 退款中中 2. 已退款 -1已关闭）',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  refund_time INT(11) NOT NULL DEFAULT 0 COMMENT '支付时间',
  close_time INT(11) NOT NULL DEFAULT 0 COMMENT '关闭时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '支付记录表';

DROP TABLE IF EXISTS `{{prefix}}pay_channel`;
CREATE TABLE `{{prefix}}pay_channel` (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点id',
  type VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '支付类型',
  channel VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '支付渠道',
  config TEXT NOT NULL COMMENT '支付配置',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  update_time INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  status INT(11) NOT NULL DEFAULT 0 COMMENT '是否启用',
  sort INT(11) NOT NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '支付渠道配置表';

ALTER TABLE `{{prefix}}pay` CHARACTER SET utf8mb4,COLLATE utf8mb4_general_ci;

ALTER TABLE `{{prefix}}pay` ADD COLUMN channel VARCHAR(50) NOT NULL DEFAULT '' COMMENT '支付渠道';

DROP TABLE IF EXISTS `{{prefix}}order_item_refund`;
CREATE TABLE `{{prefix}}order_item_refund` (
  refund_id INT(11) NOT NULL AUTO_INCREMENT,
  order_item_id INT(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  order_id INT(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点id',
  member_id INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  num DECIMAL(10, 3) NOT NULL DEFAULT 0.000 COMMENT '退货数量',
  money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总退款',
  refund_no VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '退款单号',
  status INT(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  audit_time INT(11) NOT NULL DEFAULT 0 COMMENT '审核时间',
  transfer_time INT(11) NOT NULL DEFAULT 0 COMMENT '转账时间',
  item_type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  PRIMARY KEY (refund_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '订单退款表';

ALTER TABLE `{{prefix}}order_item` DROP COLUMN refund_id;

ALTER TABLE `{{prefix}}order_item` ADD COLUMN refund_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '退款编号';

ALTER TABLE `{{prefix}}order_item` MODIFY COLUMN item_type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '项目类型';

ALTER TABLE `{{prefix}}order_item` MODIFY refund_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '退款编号' AFTER is_refund;

DROP TABLE IF EXISTS `{{prefix}}member_cash_out_account`;
CREATE TABLE `{{prefix}}member_cash_out_account` (
  account_id INT(11) NOT NULL AUTO_INCREMENT,
  site_id INT(11) NOT NULL COMMENT '站点id',
  member_id INT(11) NOT NULL COMMENT '会员id',
  account_type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '账户类型',
  bank_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '银行名称',
  realname VARCHAR(255) NOT NULL DEFAULT '' COMMENT '真实名称',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  update_time INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  account_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '提现账户',
  PRIMARY KEY (account_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员提现账户';

DROP TABLE IF EXISTS `{{prefix}}member_cash_out`;
CREATE TABLE `{{prefix}}member_cash_out` (
  id INT(11) NOT NULL AUTO_INCREMENT,
  site_id INT(11) NOT NULL DEFAULT 1 COMMENT '站点id',
  cash_out_no VARCHAR(50) NOT NULL DEFAULT '' COMMENT '提现交易号',
  member_id INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  account_type VARCHAR(255) NOT NULL DEFAULT 'money' COMMENT '提现账户类型',
  transfer_type VARCHAR(20) NOT NULL DEFAULT '0' COMMENT '转账提现类型',
  transfer_realname VARCHAR(50) NOT NULL DEFAULT '' COMMENT '联系人名称',
  transfer_mobile VARCHAR(11) NOT NULL DEFAULT '' COMMENT '手机号',
  transfer_bank VARCHAR(255) NOT NULL DEFAULT '' COMMENT '银行名称',
  transfer_account VARCHAR(255) NOT NULL DEFAULT '' COMMENT '收款账号',
  transfer_fail_reason VARCHAR(255) NOT NULL DEFAULT '' COMMENT '失败原因',
  transfer_status VARCHAR(20) NOT NULL DEFAULT '' COMMENT '转账状态',
  transfer_time INT(11) NOT NULL DEFAULT 0 COMMENT '转账时间',
  apply_money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现申请金额',
  rate DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现手续费比率',
  service_money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现手续费',
  money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '提现到账金额',
  audit_time INT(11) NOT NULL DEFAULT 0 COMMENT '审核时间',
  status INT(11) NOT NULL DEFAULT 0 COMMENT '状态1待审核2.待转账3已转账 -1拒绝 -2 已取消',
  remark VARCHAR(100) NOT NULL DEFAULT '' COMMENT '备注',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '申请时间',
  refuse_reason VARCHAR(100) NOT NULL DEFAULT '' COMMENT '拒绝理由',
  update_time INT(11) NOT NULL DEFAULT 0,
  transfer_no VARCHAR(50) NOT NULL DEFAULT '' COMMENT '转账单号',
  cancel_time INT(11) NOT NULL DEFAULT 0 COMMENT '取消时间',
  final_transfer_type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '转账方式',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员提现表';

ALTER TABLE `{{prefix}}member_cash_out` ADD INDEX member_withdraw_apply_time(create_time);

ALTER TABLE `{{prefix}}member_cash_out` ADD INDEX member_withdraw_audit_time(audit_time);

ALTER TABLE `{{prefix}}member_cash_out` ADD INDEX member_withdraw_site_id(site_id, member_id);

ALTER TABLE `{{prefix}}member_cash_out` ADD INDEX member_withdraw_status(status);

ALTER TABLE `{{prefix}}member_cash_out` ADD INDEX member_withdraw_withdraw_no(cash_out_no);

ALTER TABLE `{{prefix}}member` DROP COLUMN money_withdrawing;

ALTER TABLE `{{prefix}}member` CHANGE COLUMN money money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '可用余额（可提现）';

ALTER TABLE `{{prefix}}member` CHANGE COLUMN money_get money_get DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计获取余额（可提现）';

ALTER TABLE `{{prefix}}member` CHANGE COLUMN update_time update_time INT NOT NULL DEFAULT 0 COMMENT '修改时间';

ALTER TABLE `{{prefix}}member` ADD COLUMN money_cash_outing DECIMAL(10, 2) NOT NULL COMMENT '提现中余额（可提现）';

ALTER TABLE `{{prefix}}member` ADD COLUMN commission DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '当前佣金';

ALTER TABLE `{{prefix}}member` ADD COLUMN commission_get DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '佣金获取';

ALTER TABLE `{{prefix}}member` ADD COLUMN commission_cash_outing DECIMAL(10, 2) NOT NULL COMMENT '提现中佣金';

ALTER TABLE `{{prefix}}member` MODIFY money_cash_outing DECIMAL(10, 2) NOT NULL COMMENT '提现中余额（可提现）' AFTER money_get;

ALTER TABLE `{{prefix}}member` MODIFY commission DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '当前佣金' AFTER growth_get;

ALTER TABLE `{{prefix}}member` MODIFY commission_get DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '佣金获取' AFTER commission;

ALTER TABLE `{{prefix}}member` MODIFY commission_cash_outing DECIMAL(10, 2) NOT NULL COMMENT '提现中佣金' AFTER commission_get;

DROP TABLE IF EXISTS `{{prefix}}jobs_failed`;
CREATE TABLE `{{prefix}}jobs_failed` (
  id INT(11) NOT NULL AUTO_INCREMENT,
  `connection` TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload LONGTEXT NOT NULL,
  exception LONGTEXT NOT NULL,
  fail_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '消息队列任务失败记录表';

DROP TABLE IF EXISTS `{{prefix}}jobs`;
CREATE TABLE `{{prefix}}jobs` (
  id INT(11) NOT NULL AUTO_INCREMENT,
  queue VARCHAR(255) NOT NULL,
  payload LONGTEXT NOT NULL,
  attempts TINYINT(4) UNSIGNED NOT NULL,
  reserved TINYINT(4) UNSIGNED NOT NULL,
  reserve_time INT(11) UNSIGNED DEFAULT NULL,
  available_time INT(11) UNSIGNED NOT NULL,
  create_time INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '消息队列任务表';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_required is_required TINYINT DEFAULT 0 COMMENT '是否必填 0-非必填 1-必填';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_pk is_pk TINYINT DEFAULT 0 COMMENT '是否为主键 0-不是 1-是';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_insert is_insert TINYINT DEFAULT 0 COMMENT '是否为插入字段 0-不是 1-是';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_update is_update TINYINT DEFAULT 0 COMMENT '是否为更新字段 0-不是 1-是';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_lists is_lists TINYINT DEFAULT 1 COMMENT '是否为列表字段 0-不是 1-是';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_query is_query TINYINT DEFAULT 1 COMMENT '是否为查询字段 0-不是 1-是';

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN is_search is_search TINYINT DEFAULT 1 COMMENT '是否搜索字段';

ALTER TABLE `{{prefix}}diy_route` CHARACTER SET utf8mb4,COLLATE utf8mb4_general_ci;

ALTER TABLE `{{prefix}}diy_route` CHANGE COLUMN title title VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面名称';

ALTER TABLE `{{prefix}}diy_route` CHANGE COLUMN name name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面标识';

ALTER TABLE `{{prefix}}diy_route` CHANGE COLUMN page page VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面路径';

ALTER TABLE `{{prefix}}diy_route` CHANGE COLUMN share share VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '分享内容';

ALTER TABLE `{{prefix}}article` ALTER COLUMN category_id DROP DEFAULT;

DROP TABLE IF EXISTS `{{prefix}}addon_log`;
CREATE TABLE `{{prefix}}addon_log` (
  id INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  action VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '操作类型   install 安装 uninstall 卸载 update 更新',
  `key` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '插件标识',
  from_version VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '升级前的版本号',
  to_version VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '升级后的版本号',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '插件日志表';

DROP TABLE IF EXISTS `{{prefix}}addon`;
CREATE TABLE `{{prefix}}addon` (
  id INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  title VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '插件名称',
  icon VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '插件图标',
  `key` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '插件标识',
  `desc` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '插件描述',
  status TINYINT(4) NOT NULL DEFAULT 1 COMMENT '状态',
  author VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '作者',
  version VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '版本号',
  create_time INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  install_time INT(11) NOT NULL DEFAULT 0 COMMENT '安装时间',
  update_time INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '插件表';

ALTER TABLE `{{prefix}}addon` ADD UNIQUE INDEX UK_title(title);
