
RENAME TABLE `{{prefix}}order` TO `{{prefix}}recharge_order`;

RENAME TABLE `{{prefix}}order_item` TO `{{prefix}}recharge_order_item`;

RENAME TABLE `{{prefix}}order_item_refund` TO `{{prefix}}recharge_order_item_refund`;

RENAME TABLE `{{prefix}}order_log` TO `{{prefix}}recharge_order_log`;

ALTER TABLE `{{prefix}}sys_role` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_notice_sms_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0;

ALTER TABLE `{{prefix}}sys_cron_task` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0;

ALTER TABLE `{{prefix}}site` CHANGE COLUMN expire_time expire_time BIGINT NOT NULL DEFAULT 0 COMMENT '到期时间（如果是0 无限期）';

ALTER TABLE `{{prefix}}pay_transfer` MODIFY COLUMN transfer_type VARCHAR(20) NOT NULL DEFAULT '' COMMENT '转账类型';

ALTER TABLE `{{prefix}}pay_refund` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}pay_refund` MODIFY COLUMN money DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付金额';

ALTER TABLE `{{prefix}}member` CHANGE COLUMN username username VARCHAR(255) NOT NULL DEFAULT '' COMMENT '会员用户名';

ALTER TABLE `{{prefix}}jobs` DROP COLUMN reserved;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN available_time available_time INT UNSIGNED DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN create_time create_time INT UNSIGNED DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` MODIFY COLUMN attempts TINYINT UNSIGNED NOT NULL DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` MODIFY COLUMN reserve_time INT UNSIGNED DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` ADD INDEX queue(queue);

ALTER TABLE `{{prefix}}generate_column` CHANGE COLUMN update_time update_time INT NOT NULL DEFAULT 0 COMMENT '修改时间';

ALTER TABLE `{{prefix}}generate_column` MODIFY COLUMN create_time INT NOT NULL DEFAULT 0 COMMENT '创建时间';

ALTER TABLE `{{prefix}}article` CHANGE COLUMN visit_virtual visit_virtual INT NOT NULL DEFAULT 0 COMMENT '初始浏览量';

ALTER TABLE `{{prefix}}addon_log` CHANGE COLUMN action action VARCHAR(40) NOT NULL DEFAULT '' COMMENT '操作类型   install 安装 uninstall 卸载 update 更新';

ALTER TABLE `{{prefix}}addon_log` CHANGE COLUMN `key` `key` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '插件标识';

ALTER TABLE `{{prefix}}addon_log` CHANGE COLUMN from_version from_version VARCHAR(20) NOT NULL DEFAULT '' COMMENT '升级前的版本号';

ALTER TABLE `{{prefix}}addon_log` CHANGE COLUMN to_version to_version VARCHAR(20) NOT NULL DEFAULT '' COMMENT '升级后的版本号';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN title title VARCHAR(40) NOT NULL DEFAULT '' COMMENT '插件名称';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN icon icon VARCHAR(255) NOT NULL DEFAULT '' COMMENT '插件图标';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN `key` `key` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '插件标识';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN `desc` `desc` TEXT DEFAULT NULL COMMENT '插件描述';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN author author VARCHAR(40) NOT NULL DEFAULT '' COMMENT '作者';

ALTER TABLE `{{prefix}}addon` CHANGE COLUMN version version VARCHAR(20) NOT NULL DEFAULT '' COMMENT '版本号';