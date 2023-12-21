<?php
return [
    'pages' => <<<EOT
        // PAGE_BEGIN
        {
            "path": "{{addon_name}}/pages/index",
            "style": {
                // #ifdef H5
                "navigationStyle": "custom",
                // #endif
                "navigationBarTitleText": "%{{addon_name}}.pages.index%"
            }
        }
        // PAGE_END
EOT
];
