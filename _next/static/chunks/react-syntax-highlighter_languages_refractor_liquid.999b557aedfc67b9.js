"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1323],{4927:function(e,t,n){var a=n(3205);function i(e){e.register(a),e.languages.liquid={comment:{pattern:/(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,lookbehind:!0},delimiter:{pattern:/^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,alias:"punctuation"},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},keyword:/\b(?:as|assign|break|continue|cycle|decrement|echo|else|elsif|(?:end)?(?:capture|case|comment|for|form|if|paginate|style|raw|tablerow|unless)|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,object:/\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|comment|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|form|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|paginate|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|section|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tablerow|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,function:[{pattern:/(\|\s*)\w+/,lookbehind:!0,alias:"filter"},{pattern:/(\.\s*)(?:first|last|size)/,lookbehind:!0}],boolean:/\b(?:true|false|nil)\b/,range:{pattern:/\.\./,alias:"operator"},number:/\b\d+(?:\.\d+)?\b/,operator:/[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|or|contains(?=\s))\b/,punctuation:/[.,\[\]()]/,empty:{pattern:/\bempty\b/,alias:"keyword"}},e.hooks.add("before-tokenize",(function(t){var n=!1;e.languages["markup-templating"].buildPlaceholders(t,"liquid",/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g,(function(e){var t=/^\{%-?\s*(\w+)/.exec(e);if(t){var a=t[1];if("raw"===a&&!n)return n=!0,!0;if("endraw"===a)return n=!1,!0}return!n}))})),e.hooks.add("after-tokenize",(function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"liquid")}))}e.exports=i,i.displayName="liquid",i.aliases=[]}}]);