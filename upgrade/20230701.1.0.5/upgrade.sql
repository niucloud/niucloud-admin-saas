
ALTER TABLE `{{prefix}}wechat_reply` MODIFY COLUMN `create_time` INT NOT NULL DEFAULT 0 COMMENT '创建时间';

ALTER TABLE `{{prefix}}pay` ADD COLUMN `trade_id` INT(11) NOT NULL DEFAULT 0 COMMENT '业务id';

ALTER TABLE `{{prefix}}pay` MODIFY `trade_id` INT(11) NOT NULL DEFAULT 0 COMMENT '业务id' AFTER `trade_type`;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN `attempts` `attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN `reserve_time` `reserve_time` INT UNSIGNED DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN `available_time` `available_time` INT UNSIGNED DEFAULT 0;

ALTER TABLE `{{prefix}}jobs` CHANGE COLUMN `create_time` `create_time` INT UNSIGNED DEFAULT 0;

DROP TABLE IF EXISTS `{{prefix}}applet_version`;

CREATE TABLE `{{prefix}}applet_version` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '配置信息',
  `type` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '小程序类型',
  `desc` TEXT DEFAULT NULL COMMENT '插件描述',
  `status` TINYINT(4) NOT NULL DEFAULT 1 COMMENT '状态  下架  上架',
  `uid` VARCHAR(40) NOT NULL DEFAULT '' COMMENT '发布者',
  `path` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '小程序包地址',
  `version` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '版本号',
  `version_num` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '版本号数字(用于排序)',
  `release_version` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '发布线上版本号',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `delete_time` INT(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `site_id` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '小程序版本表';

DROP TABLE IF EXISTS `{{prefix}}applet_site_version`;
CREATE TABLE `{{prefix}}applet_site_version` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `version_id` INT(11) NOT NULL DEFAULT 0 COMMENT '版本id',
  `type` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '小程序类型',
  `action` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '操作方式 download 下载  upgrade 更新',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '站点小程序版本表';