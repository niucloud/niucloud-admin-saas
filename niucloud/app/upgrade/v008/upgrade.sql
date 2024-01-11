
ALTER TABLE `site_group` MODIFY COLUMN app text NOT NULL COMMENT '应用';

UPDATE `site_group` nsg SET nsg.app = CONCAT('["', nsg.app, '"]') where nsg.app != '';

ALTER TABLE `site` MODIFY COLUMN app text NOT NULL COMMENT '站点应用';

UPDATE `site` SET app = CONCAT('["', app, '"]') where app != '';

ALTER TABLE `generate_column` ADD COLUMN `addon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '远程下拉关联应用' AFTER `dict_type`,
ADD COLUMN `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '远程下拉关联model' AFTER `addon`,
ADD COLUMN `label_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '远程下拉标题字段' AFTER `model`,
ADD COLUMN `value_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '远程下拉value字段' AFTER `label_key`;
