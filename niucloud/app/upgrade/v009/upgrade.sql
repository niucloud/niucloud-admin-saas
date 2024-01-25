
ALTER TABLE `sys_user_log` MODIFY COLUMN `params` longtext DEFAULT NULL COMMENT '参数';

ALTER TABLE `sys_menu` MODIFY COLUMN `sort` int NOT NULL DEFAULT 1 COMMENT '排序';

ALTER TABLE `sys_notice_sms_log` MODIFY COLUMN `content` text NOT NULL COMMENT '发送内容';
ALTER TABLE `sys_notice_sms_log` MODIFY COLUMN `params` text NOT NULL COMMENT '数据参数';
