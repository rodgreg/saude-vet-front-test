[33mcommit 72fd7aa2315f67735c3b5affc53a0a2cf72c3064[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Marcelo G Botelho <marcunb@gmail.com>
Date:   Mon Jun 5 14:40:49 2023 -0300

    Atualização registro consulta

[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex a0ac3c3..54c96bc 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -29,7 +29,6 @@[m
         "react-bootstrap": "^2.5.0-beta.1",[m
         "react-ckeditor-component": "^1.1.0",[m
         "react-dom": "^18.2.0",[m
[31m-        "react-draft-wysiwyg": "^1.15.0",[m
         "react-google-charts": "^4.0.0",[m
         "react-icons": "^4.8.0",[m
         "react-paginate": "^8.1.4",[m
[36m@@ -38,8 +37,6 @@[m
       },[m
       "devDependencies": {[m
         "@types/ckeditor__ckeditor5-build-decoupled-document": "^29.1.1",[m
[31m-        "@types/draft-js": "^0.11.10",[m
[31m-        "@types/draftjs-to-html": "^0.8.1",[m
         "@types/node": "^18.14.6",[m
         "@types/react": "^18.0.24",[m
         "@types/react-big-calendar": "^1.6.3",[m
[36m@@ -2256,15 +2253,6 @@[m
         "node": ">=0.8.0"[m
       }[m
     },[m
[31m-    "node_modules/@types/draftjs-to-html": {[m
[31m-      "version": "0.8.1",[m
[31m-      "resolved": "https://registry.npmjs.org/@types/draftjs-to-html/-/draftjs-to-html-0.8.1.tgz",[m
[31m-      "integrity": "sha512-NBkphQs+qZ/sAz/j1pCUaxkPAOx00LTsE88aMSSfcvK+UfCpjHJDqIMCkm6wKotuJvY5w0BtdRazQ0sAaXzPdg==",[m
[31m-      "dev": true,[m
[31m-      "dependencies": {[m
[31m-        "@types/draft-js": "*"[m
[31m-      }[m
[31m-    },[m
     "node_modules/@types/node": {[m
       "version": "18.14.6",[m
       "resolved": "https://registry.npmjs.org/@types/node/-/node-18.14.6.tgz",[m
[36m@@ -2378,12 +2366,6 @@[m
         "node": ">=10"[m
       }[m
     },[m
[31m-    "node_modules/asap": {[m
[31m-      "version": "2.0.6",[m
[31m-      "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",[m
[31m-      "integrity": "sha512-BSHWgDSAiKs50o2Re8ppvp3seVHXSRM44cdSsT9FfNEUUZLOGWVCsiWaRPWM1Znn+mqZ1OfVZ3z3DWEzSp7hRA==",[m
[31m-      "peer": true[m
[31m-    },[m
     "node_modules/asynckit": {[m
       "version": "0.4.0",[m
       "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",[m
[36m@@ -2713,26 +2695,6 @@[m
       "integrity": "sha512-ASFBup0Mz1uyiIjANan1jzLQami9z1PoYSZCiiYW2FczPbenXc45FZdBZLzOT+r6+iciuEModtmCti+hjaAk0A==",[m
       "dev": true[m
     },[m
[31m-    "node_modules/core-js": {[m
[31m-      "version": "3.29.0",[m
[31m-      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.29.0.tgz",[m
[31m-      "integrity": "sha512-VG23vuEisJNkGl6XQmFJd3rEG/so/CNatqeE+7uZAwTSwFeB/qaO0be8xZYUNWprJ/GIwL8aMt9cj1kvbpTZhg==",[m
[31m-      "hasInstallScript": true,[m
[31m-      "peer": true,[m
[31m-      "funding": {[m
[31m-        "type": "opencollective",[m
[31m-        "url": "https://opencollective.com/core-js"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/cross-fetch": {[m
[31m-      "version": "3.1.5",[m
[31m-      "resolved": "https://registry.npmjs.org/cross-fetch/-/cross-fetch-3.1.5.tgz",[m
[31m-      "integrity": "sha512-lvb1SBsI0Z7GDwmuid+mU3kWVBwTVUbe7S0H52yaaAdQOXq2YktTCZdlAcNKFzE6QtRz0snpw9bNiPeOIkkQvw==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "node-fetch": "2.6.7"[m
[31m-      }[m
[31m-    },[m
     "node_modules/csstype": {[m
       "version": "3.1.1",[m
       "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.1.tgz",[m
[36m@@ -2800,44 +2762,11 @@[m
         "csstype": "^3.0.2"[m
       }[m
     },[m
[31m-    "node_modules/draft-js": {[m
[31m-      "version": "0.11.7",[m
[31m-      "resolved": "https://registry.npmjs.org/draft-js/-/draft-js-0.11.7.tgz",[m
[31m-      "integrity": "sha512-ne7yFfN4sEL82QPQEn80xnADR8/Q6ALVworbC5UOSzOvjffmYfFsr3xSZtxbIirti14R7Y33EZC5rivpLgIbsg==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "fbjs": "^2.0.0",[m
[31m-        "immutable": "~3.7.4",[m
[31m-        "object-assign": "^4.1.1"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "react": ">=0.14.0",[m
[31m-        "react-dom": ">=0.14.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/draft-js/node_modules/immutable": {[m
[31m-      "version": "3.7.6",[m
[31m-      "resolved": "https://registry.npmjs.org/immutable/-/immutable-3.7.6.tgz",[m
[31m-      "integrity": "sha512-AizQPcaofEtO11RZhPPHBOJRdo/20MKQF9mBLnVkBoyHi1/zXK8fzVdnEpSV9gxqtnh6Qomfp3F0xT5qP/vThw==",[m
[31m-      "peer": true,[m
[31m-      "engines": {[m
[31m-        "node": ">=0.8.0"[m
[31m-      }[m
[31m-    },[m
     "node_modules/draftjs-to-html": {[m
       "version": "0.9.1",[m
       "resolved": "https://registry.npmjs.org/draftjs-to-html/-/draftjs-to-html-0.9.1.tgz",[m
       "integrity": "sha512-fFstE6+IayaVFBEvaFt/wN8vdj8FsTRzij7dy7LI9QIwf5LgfHFi9zSpvCg+feJ2tbYVqHxUkjcibwpsTpgFVQ=="[m
     },[m
[31m-    "node_modules/draftjs-utils": {[m
[31m-      "version": "0.10.2",[m
[31m-      "resolved": "https://registry.npmjs.org/draftjs-utils/-/draftjs-utils-0.10.2.tgz",[m
[31m-      "integrity": "sha512-EstHqr3R3JVcilJrBaO/A+01GvwwKmC7e4TCjC7S94ZeMh4IVmf60OuQXtHHpwItK8C2JCi3iljgN5KHkJboUg==",[m
[31m-      "peerDependencies": {[m
[31m-        "draft-js": "^0.11.x",[m
[31m-        "immutable": "3.x.x || 4.x.x"[m
[31m-      }[m
[31m-    },[m
     "node_modules/electron-to-chromium": {[m
       "version": "1.4.320",[m
       "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.320.tgz",[m
[36m@@ -3227,28 +3156,6 @@[m
         "node": ">=0.10.0"[m
       }[m
     },[m
[31m-    "node_modules/fbjs": {[m
[31m-      "version": "2.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/fbjs/-/fbjs-2.0.0.tgz",[m
[31m-      "integrity": "sha512-8XA8ny9ifxrAWlyhAbexXcs3rRMtxWcs3M0lctLfB49jRDHiaxj+Mo0XxbwE7nKZYzgCFoq64FS+WFd4IycPPQ==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "core-js": "^3.6.4",[m
[31m-        "cross-fetch": "^3.0.4",[m
[31m-        "fbjs-css-vars": "^1.0.0",[m
[31m-        "loose-envify": "^1.0.0",[m
[31m-        "object-assign": "^4.1.0",[m
[31m-        "promise": "^7.1.1",[m
[31m-        "setimmediate": "^1.0.5",[m
[31m-        "ua-parser-js": "^0.7.18"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/fbjs-css-vars": {[m
[31m-      "version": "1.0.2",[m
[31m-      "resolved": "https://registry.npmjs.org/fbjs-css-vars/-/fbjs-css-vars-1.0.2.tgz",[m
[31m-      "integrity": "sha512-b2XGFAFdWZWg0phtAWLHCk836A1Xann+I+Dgd3Gk64MHKZO44FfoD1KxyvbSh0qZsIoXQGGlVztIY+oitJPpRQ==",[m
[31m-      "peer": true[m
[31m-    },[m
     "node_modules/follow-redirects": {[m
       "version": "1.15.2",[m
       "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.2.tgz",[m
[36m@@ -3377,21 +3284,6 @@[m
         "node": ">=4"[m
       }[m
     },[m
[31m-    "node_modules/html-to-draftjs": {[m
[31m-      "version": "1.5.0",[m
[31m-      "resolved": "https://registry.npmjs.org/html-to-draftjs/-/html-to-draftjs-1.5.0.tgz",[m
[31m-      "integrity": "sha512-kggLXBNciKDwKf+KYsuE+V5gw4dZ7nHyGMX9m0wy7urzWjKGWyNFetmArRLvRV0VrxKN70WylFsJvMTJx02OBQ==",[m
[31m-      "peerDependencies": {[m
[31m-        "draft-js": "^0.10.x || ^0.11.x",[m
[31m-        "immutable": "3.x.x || 4.x.x"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/immutable": {[m
[31m-      "version": "4.2.4",[m
[31m-      "resolved": "https://registry.npmjs.org/immutable/-/immutable-4.2.4.tgz",[m
[31m-      "integrity": "sha512-WDxL3Hheb1JkRN3sQkyujNlL/xRjAo3rJtaU5xeufUauG66JdMr32bLj4gF+vWl84DIA3Zxw7tiAjneYzRRw+w==",[m
[31m-      "peer": true[m
[31m-    },[m
     "node_modules/inflight": {[m
       "version": "1.0.6",[m
       "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",[m
[36m@@ -3460,14 +3352,6 @@[m
         "node": ">=6"[m
       }[m
     },[m
[31m-    "node_modules/linkify-it": {[m
[31m-      "version": "2.2.0",[m
[31m-      "resolved": "https://registry.npmjs.org/linkify-it/-/linkify-it-2.2.0.tgz",[m
[31m-      "integrity": "sha512-GnAl/knGn+i1U/wjBz3akz2stz+HrHLsxMwHQGofCDfPvlf+gDKN58UtfmUquTY4/MXeE2x7k19KQmeoZi94Iw==",[m
[31m-      "dependencies": {[m
[31m-        "uc.micro": "^1.0.1"[m
[31m-      }[m
[31m-    },[m
     "node_modules/load-script": {[m
       "version": "1.0.0",[m
       "resolved": "https://registry.npmjs.org/load-script/-/load-script-1.0.0.tgz",[m
[36m@@ -3617,26 +3501,6 @@[m
         "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"[m
       }[m
     },[m
[31m-    "node_modules/node-fetch": {[m
[31m-      "version": "2.6.7",[m
[31m-      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.7.tgz",[m
[31m-      "integrity": "sha512-ZjMPFEfVx5j+y2yF35Kzx5sF7kDzxuDj6ziH4FFbOp87zKDZNx8yExJIb05OGF4Nlt9IHFIMBkRl41VdvcNdbQ==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "whatwg-url": "^5.0.0"[m
[31m-      },[m
[31m-      "engines": {[m
[31m-        "node": "4.x || >=6.0.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "encoding": "^0.1.0"[m
[31m-      },[m
[31m-      "peerDependenciesMeta": {[m
[31m-        "encoding": {[m
[31m-          "optional": true[m
[31m-        }[m
[31m-      }[m
[31m-    },[m
     "node_modules/node-releases": {[m
       "version": "2.0.10",[m
       "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.10.tgz",[m
[36m@@ -3713,15 +3577,6 @@[m
         "node": "^10 || ^12 || >=14"[m
       }[m
     },[m
[31m-    "node_modules/promise": {[m
[31m-      "version": "7.3.1",[m
[31m-      "resolved": "https://registry.npmjs.org/promise/-/promise-7.3.1.tgz",[m
[31m-      "integrity": "sha512-nolQXZ/4L+bP/UGlkfaIujX9BKxGwmQ9OT4mOt5yvy8iK1h3wqTEJCijzGANTCCl9nWjY41juyAn2K3Q1hLLTg==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "asap": "~2.0.3"[m
[31m-      }[m
[31m-    },[m
     "node_modules/prop-types": {[m
       "version": "15.8.1",[m
       "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",[m
[36m@@ -3839,24 +3694,6 @@[m
         "react": "^18.2.0"[m
       }[m
     },[m
[31m-    "node_modules/react-draft-wysiwyg": {[m
[31m-      "version": "1.15.0",[m
[31m-      "resolved": "https://registry.npmjs.org/react-draft-wysiwyg/-/react-draft-wysiwyg-1.15.0.tgz",[m
[31m-      "integrity": "sha512-p1cYZcWc6/ALFBVksbFoCM3b29fGQDlZLIMrXng0TU/UElxIOF2/AWWo4L5auIYVhmqKTZ0NkNjnXOzGGuxyeA==",[m
[31m-      "dependencies": {[m
[31m-        "classnames": "^2.2.6",[m
[31m-        "draftjs-utils": "^0.10.2",[m
[31m-        "html-to-draftjs": "^1.5.0",[m
[31m-        "linkify-it": "^2.2.0",[m
[31m-        "prop-types": "^15.7.2"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "draft-js": "^0.10.x || ^0.11.x",[m
[31m-        "immutable": "3.x.x || 4.x.x",[m
[31m-        "react": "0.13.x || 0.14.x || ^15.0.0-0 || 15.x.x || ^16.0.0-0 || ^16.x.x || ^17.x.x || ^18.x.x",[m
[31m-        "react-dom": "0.13.x || 0.14.x || ^15.0.0-0 || 15.x.x || ^16.0.0-0 || ^16.x.x || ^17.x.x || ^18.x.x"[m
[31m-      }[m
[31m-    },[m
     "node_modules/react-google-charts": {[m
       "version": "4.0.0",[m
       "resolved": "https://registry.npmjs.org/react-google-charts/-/react-google-charts-4.0.0.tgz",[m
[36m@@ -4133,12 +3970,6 @@[m
         "semver": "bin/semver.js"[m
       }[m
     },[m
[31m-    "node_modules/setimmediate": {[m
[31m-      "version": "1.0.5",[m
[31m-      "resolved": "https://registry.npmjs.org/setimmediate/-/setimmediate-1.0.5.tgz",[m
[31m-      "integrity": "sha512-MATJdZp8sLqDl/68LfQmbP8zKPLQNV6BIZoIgrscFDQ+RsvK/BxeDQOgyxKKoh0y/8h3BqVFnCqQ/gd+reiIXA==",[m
[31m-      "peer": true[m
[31m-    },[m
     "node_modules/source-map-js": {[m
       "version": "1.0.2",[m
       "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",[m
[36m@@ -4188,12 +4019,6 @@[m
         "node": ">=4"[m
       }[m
     },[m
[31m-    "node_modules/tr46": {[m
[31m-      "version": "0.0.3",[m
[31m-      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",[m
[31m-      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",[m
[31m-      "peer": true[m
[31m-    },[m
     "node_modules/tslib": {[m
       "version": "2.5.0",[m
       "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.0.tgz",[m
[36m@@ -4212,30 +4037,6 @@[m
         "node": ">=4.2.0"[m
       }[m
     },[m
[31m-    "node_modules/ua-parser-js": {[m
[31m-      "version": "0.7.34",[m
[31m-      "resolved": "https://registry.npmjs.org/ua-parser-js/-/ua-parser-js-0.7.34.tgz",[m
[31m-      "integrity": "sha512-cJMeh/eOILyGu0ejgTKB95yKT3zOenSe9UGE3vj6WfiOwgGYnmATUsnDixMFvdU+rNMvWih83hrUP8VwhF9yXQ==",[m
[31m-      "funding": [[m
[31m-        {[m
[31m-          "type": "opencollective",[m
[31m-          "url": "https://opencollective.com/ua-parser-js"[m
[31m-        },[m
[31m-        {[m
[31m-          "type": "paypal",[m
[31m-          "url": "https://paypal.me/faisalman"[m
[31m-        }[m
[31m-      ],[m
[31m-      "peer": true,[m
[31m-      "engines": {[m
[31m-        "node": "*"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/uc.micro": {[m
[31m-      "version": "1.0.6",[m
[31m-      "resolved": "https://registry.npmjs.org/uc.micro/-/uc.micro-1.0.6.tgz",[m
[31m-      "integrity": "sha512-8Y75pvTYkLJW2hWQHXxoqRgV7qb9B+9vFEtidML+7koHUFapnVJAZ6cKs+Qjz5Aw3aZWHMC6u0wJE3At+nSGwA=="[m
[31m-    },[m
     "node_modules/uncontrollable": {[m
       "version": "7.2.1",[m
       "resolved": "https://registry.npmjs.org/uncontrollable/-/uncontrollable-7.2.1.tgz",[m
[36m@@ -4396,22 +4197,6 @@[m
         "loose-envify": "^1.0.0"[m
       }[m
     },[m
[31m-    "node_modules/webidl-conversions": {[m
[31m-      "version": "3.0.1",[m
[31m-      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",[m
[31m-      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",[m
[31m-      "peer": true[m
[31m-    },[m
[31m-    "node_modules/whatwg-url": {[m
[31m-      "version": "5.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",[m
[31m-      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",[m
[31m-      "peer": true,[m
[31m-      "dependencies": {[m
[31m-        "tr46": "~0.0.3",[m
[31m-        "webidl-conversions": "^3.0.0"[m
[31m-      }[m
[31m-    },[m
     "node_modules/wrappy": {[m
       "version": "1.0.2",[m
       "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 85a3001..b729afb 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -9,7 +9,7 @@[m
     "preview": "vite preview"[m
   },[m
   "dependencies": {[m
[31m-    "@ckeditor/ckeditor5-build-classic": "^36.0.1",[m
[32m+[m[32m    "@ckeditor/ckeditor5-build-classic": "^38.0.1",[m
     "@ckeditor/ckeditor5-build-decoupled-document": "^36.0.1",[m
     "@ckeditor/ckeditor5-editor-decoupled": "^36.0.1",[m
     "@ckeditor/ckeditor5-react": "^5.0.6",[m
[36m@@ -30,7 +30,6 @@[m
     "react-bootstrap": "^2.5.0-beta.1",[m
     "react-ckeditor-component": "^1.1.0",[m
     "react-dom": "^18.2.0",[m
[31m-    "react-draft-wysiwyg": "^1.15.0",[m
     "react-google-charts": "^4.0.0",[m
     "react-icons": "^4.8.0",[m
     "react-paginate": "^8.1.4",[m
[36m@@ -39,8 +38,6 @@[m
   },[m
   "devDependencies": {[m
     "@types/ckeditor__ckeditor5-build-decoupled-document": "^29.1.1",[m
[31m-    "@types/draft-js": "^0.11.10",[m
[31m-    "@types/draftjs-to-html": "^0.8.1",[m
     "@types/node": "^18.14.6",[m
     "@types/react": "^18.0.24",[m
     "@types/react-big-calendar"