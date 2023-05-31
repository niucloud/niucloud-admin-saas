<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "path": "pages/hello_world/index",
            "style": {
                // #ifdef H5
                "navigationStyle": "custom",
                // #endif
                "navigationBarTitleText": "%pages.hello_world.index%"
            }
        },
        {
            "path": "pages/hello_world/info",
            "style": {
                // #ifdef H5
                "navigationStyle": "custom",
                // #endif
                "navigationBarTitleText": "%pages.hello_world.info%"
            }
        }
        // PAGE_END
EOT
];