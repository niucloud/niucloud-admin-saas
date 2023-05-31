
TRUNCATE TABLE `{{prefix}}diy_page`;

ALTER TABLE `{{prefix}}wechat_reply` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}wechat_media` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}wechat_fans` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_user_role` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_user_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_role` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_notice_sms_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_notice_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_notice` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点ID';

ALTER TABLE `{{prefix}}sys_cron_task` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点ID';

ALTER TABLE `{{prefix}}sys_menu` DROP COLUMN en_menu_name;

ALTER TABLE `{{prefix}}sys_config` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_attachment_category` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_attachment` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}sys_agreement` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}site` ADD COLUMN front_end_name VARCHAR(50) NOT NULL DEFAULT '' COMMENT '前台名称';

ALTER TABLE `{{prefix}}site` ADD COLUMN front_end_logo VARCHAR(255) NOT NULL DEFAULT '' COMMENT '前台logo';

ALTER TABLE `{{prefix}}site` ADD COLUMN icon VARCHAR(255) NOT NULL DEFAULT '' COMMENT '网站图标';

ALTER TABLE `{{prefix}}site` ADD COLUMN member_no VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '最大会员码值';

ALTER TABLE `{{prefix}}pay_transfer` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}pay_refund` ADD COLUMN fail_reason VARCHAR(255) NOT NULL COMMENT '失败原因';

ALTER TABLE `{{prefix}}pay_refund` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}pay_channel` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}pay` CHARACTER SET utf8mb4,COLLATE utf8mb4_general_ci;

ALTER TABLE `{{prefix}}pay` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}order_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}order_item_refund` ADD COLUMN order_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '订单编号';

ALTER TABLE `{{prefix}}order_item_refund` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}order_item_refund` MODIFY order_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '订单编号' AFTER order_id;

ALTER TABLE `{{prefix}}order_item_refund` MODIFY refund_no VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '退款单号' AFTER order_no;

ALTER TABLE `{{prefix}}order_item` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}order` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_level` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_label` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_cash_out_account` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_cash_out` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_address` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_account_log` ADD COLUMN account_sum DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '变动后的账户余额';

ALTER TABLE `{{prefix}}member_account_log` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member_account_log` MODIFY account_sum DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '变动后的账户余额' AFTER account_data;

ALTER TABLE `{{prefix}}member` ADD COLUMN member_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '会员编码';

ALTER TABLE `{{prefix}}member` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}member` MODIFY member_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '会员编码' AFTER member_id;

ALTER TABLE `{{prefix}}diy_route` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}diy_page` CHANGE COLUMN type type VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面模板';

ALTER TABLE `{{prefix}}diy_page` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点id';

ALTER TABLE `{{prefix}}article_category` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点ID';

ALTER TABLE `{{prefix}}article` MODIFY COLUMN site_id INT NOT NULL DEFAULT 0 COMMENT '站点ID';

ALTER TABLE `{{prefix}}addon` ADD COLUMN cover VARCHAR(255) NOT NULL DEFAULT '' COMMENT '封面';
