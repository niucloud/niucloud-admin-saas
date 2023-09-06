
ALTER TABLE `{{prefix}}pay_refund` ADD COLUMN voucher VARCHAR(255) NOT NULL DEFAULT '' COMMENT '支付凭证';

ALTER TABLE `{{prefix}}pay` ADD COLUMN fail_reason VARCHAR(255) NOT NULL DEFAULT '' COMMENT '失败原因';

ALTER TABLE `{{prefix}}member_account_log` CHANGE COLUMN related_id related_id VARCHAR(50) NOT NULL DEFAULT '' COMMENT '关联Id';

