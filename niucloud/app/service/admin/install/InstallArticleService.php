<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud-admin.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\install;

use app\model\article\Article;
use app\model\article\ArticleCategory;
use app\service\admin\BaseAdminService;

/**
 * 系统安装
 * Class InstallArticleService
 * @package app\service\admin\install
 */
class InstallArticleService extends BaseAdminService
{

    /**
     * 安装
     */
    public function install(array $params = [])
    {
        $this->installArticle($params);
        return true;
    }

    /**
     * 安装数据
     */
    public function installArticle(array $params = [])
    {
        $article_category = new ArticleCategory();
        $category = [
            'site_id' => $params[ 'site_id' ],
            'name' => '资讯',
            'is_show' => 1,
            'create_time' => time()
        ];
        $category_id = $article_category->insert($category);

        $article = new Article();
        $article_list = [
            [
                'category_id' => $category_id,
                'site_id' => $params[ 'site_id' ],
                'title' => 'NiuCloud-admin介绍',
                'intro' => '',
                'summary' => '',
                'image' => 'static/resource/images/article/niucloud_admin_frame.png',
                'author' => 'NiuCloud',
                'content' => '<p>Niucloud-admin特点介绍</p><p><br></p><p>1.采用的技术栈</p><p>1.1 后台php采用thinkphp6+php8+mysql,支持composer快速安装扩展，支持redis缓存以及消息队列，支持多语言设计开发，同时开发采用严格的restful的api设计开发。</p><p>1.2 后台前后端分离采用element-plus、vue3.0、typescript、vite、pina等前端技术,同时使用i18n支持国际化多语言开发。</p><p>1.3 手机端采用uniapp前后端分离，同时使用uview、vue3.0、typescript、vite、pina等前端技术，同时使用i18n支持国际化多语言开发，可以灵活编译成h5,微信小程序，支付宝小程序，抖音小程序等使用场景。</p><p><br></p><p>2.技术特点</p><p>2.1niucloud-admin采用多租户的saas系统设计，能够提供企业级软件服务运营 ，同时满足用户多站点，多商户，多门店等系统开发需求。</p><p>2.2niucloud-admin结合当前市面上很多框架结构不规范，导致基础结构不稳定等情况，严格定义了分层设计的开发规范，同时api接口严格采用restful的开发规范，能够满足大型业务系统或者微服务的开发需求。</p><p>2.3 niucloud-admin前端以及后端采用严格的多语言开发规范，包括前端展示，api接口返回，数据验证，错误返回等全部使用多语言设计规范，使开发者能够真生意义上实现多语言的开发需求。</p><p>2.4 Niucloud-admin已经搭建好常规系统的开发底层，具体的底层功能包括：管理员管理，权限管理，网站设置，计划任务管理，素材管理，会员管理，会员账户管理，微信公众号以及小程序管理，支付管理，第三方登录管理，消息管理，短信管理，文章管理，前端装修等全面的基础功能，这样开发者不需要开发基础的结构而专心开发业务。</p><p>2.5 niucloud-admin系统内置支持微信/支付宝支付，微信公众号/小程序/短信消息管理，阿里云/腾讯云短信，七牛云/阿里云存储等基础的功能扩展，后续会根据实际业务不断扩展基础组件。</p><p>2.6 niucloud-admin结合系统结构特点专门开发了代码生成器，这样开发者根据数据表就可以一键生成基础的业务代码，包括：后台php业务代码以及对应的前端vue代码。</p><p>2.7 前端采用标准的element-plus，开发者不需要详细了解前端，只需要用标准的element组件就可以。</p><p>2.8 &nbsp;手机端设计开发了自定义装修，同时提供了基础的开发组件，方便开发者设计开发手机自定义页面装修的开发需求。</p><p>2.9 &nbsp;手机端使用uniapp ，同时使用uview页面展示，可以开发出丰富的手机样式，同时不需要专门学习小程序，app等开发语言，只需要通过uniapp编译就可以。</p>',
                'is_show' => 1,
                'create_time' => time()
            ],
            [
                'category_id' => $category_id,
                'site_id' => $params[ 'site_id' ],
                'title' => 'NiuCloud-admin 开发者联盟',
                'intro' => 'Niucloud-admin 开发者联盟招募',
                'summary' => '',
                'image' => 'static/resource/images/article/niucloud_admin_developer.png',
                'author' => 'NiuCloud',
                'content' => '<p><span style="font-family: 宋体;">Niucloud-admin 开发者联盟招募</span></p><p style="text-indent: 21pt; text-align: justify;"><span style="font-family: 宋体;">近几年，我们看到很多企业都在做自己的研发，有的是企业和内部使用，有的是帮助别人定制开发，也有的已经成功走向商业化，对软件开发的学习和钻研成为了行业圈内发展很有前景的方向。同时我们也看到，大家的开发之路都多多少少遇到了各自的瓶颈。或者是接触不到真实项目需求、只能闭门造车；或者是产品研发出来，没有变现的销路；或者技术遇到了瓶颈，没办法走的更深入；或者几个人自己钻研，水平提升很慢。无论属于哪种，亲爱的开发者，如果你也正在为自己怀才不遇无处施展，或者感觉优质的技术内容没有让更多的人知道而苦恼，那么现在，机会来啦~~niucloud-admin框架为你提供优质平台，公开招募开发爱好者。今天，大牛哥把一大波福利搬来，希望可以在学习、交流和市场拓展等方面帮助大家。在针对那些想提高技术水平的个人或团队，想要基于niucloud-admin框架开发自己的产品的伙伴 ，联盟会免费提供一些列的培训或辅导答疑。针对那些渴望交流、认识同路人的小伙伴，会有线上交流会让大家互通想法、互相引荐高人。</span></p><p style="text-indent: 21pt; text-align: justify;"><span style="font-family: 宋体;">说了这么多，那么niucloud-admin到底是什么呢？且听小编来介绍~</span></p><p style="text-indent: 21pt; text-align: justify;"><span style="font-family: 宋体;">Niucloud-admin是一款快速开发通用管理后台框架，前端采用最新的技术栈Vite+TypeScript+Vue3+ElementPlus最流行技术架构，后台结合PHP8、Java SDK、Python等主流后端语言搭建，内置集成用户权限、代码生成器、表单设计、云存储、短信发送、素材中心、微信及公众号、Api模块一系列开箱即用功能，是一款快速可以开发企业级应用的软件系统。</span></p><p style="text-indent: 21pt; text-align: justify;"><span style="font-family: 宋体;">听完介绍是不是都有点马上可以从小白变成大牛的感觉了，“开箱即用”，那不是小白都可以开发出属于自己的插件了吗？对，你没听错~ 具体怎么生成，那就赶快加入niucloud-admin开发者联盟来亲身体验下吧~~</span></p><p style="text-indent: 21pt; text-align: justify;"><span style="font-family: 宋体;">有态度，有深度，niucloud-admin咱们下次见~</span></p>',
                'is_show' => 1,
                'create_time' => time()
            ]
        ];
        $article->insertAll($article_list);

        return true;
    }

}