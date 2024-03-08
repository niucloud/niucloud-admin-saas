
ALTER TABLE `site` ADD COLUMN initalled_addon text DEFAULT NULL COMMENT '站点已执行初始化方法的插件';

ALTER TABLE `site` ADD COLUMN site_domain varchar(255) NOT NULL DEFAULT '' COMMENT '站点域名';

DROP TABLE IF EXISTS `sys_poster`;
CREATE TABLE `sys_poster` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '海报名称',
  `type` varchar(255) NOT NULL DEFAULT '' COMMENT '海报类型',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '海报支持渠道',
  `value` text DEFAULT NULL COMMENT '配置值json',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '是否启用 1启用 2不启用',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '修改时间',
  `addon` varchar(255) NOT NULL DEFAULT '' COMMENT '所属插件',
  PRIMARY KEY (`id`)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '海报表';
