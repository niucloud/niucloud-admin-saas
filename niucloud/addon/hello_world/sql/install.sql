CREATE TABLE IF NOT EXISTS `{{prefix}}hello_world` (
                                                `id` int unsigned NOT NULL AUTO_INCREMENT,
                                                `name` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
                                                PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='演示插件表';
INSERT INTO `{{prefix}}hello_world`(`name`) VALUES ('名称');