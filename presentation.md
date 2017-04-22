% DocBrowse
% Julio Tain Sueiras
% 2017-04-21

Introduction
--------------------

I always wanted a documentation browser for developer, and dashdocs is wonderful, but there isn't a full mobile solution(maybe a ios one, but not a full cross hybrid)

Usefullness
--------------------
- [150+ Documentation(from Dashdocs)](https://kapeli.com/docset_links)
- [281 User Contribute Docs](https://github.com/Kapeli/Dash-User-Contributions/tree/master/docsets)

Competition
--------------------
There is [LovelyDocs](https://play.google.com/store/apps/details?id=com.lovelyhq.android.lovelydocs&hl=en) for android, but is using a very old webkit engine for rendering html,
which cause html to load very slow
and it is slow overall, and it does not have user contributed ones

Snippet Code
-------------------
Some snippet


JS/TS
-------------------
```js
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as platform from "platform";
import * as fs from 'file-system'
import * as http from 'http'
import { ViewModel } from './main-view-model'; 
let folder = fs.knownFolders.documents()

interface DocListItem {
    docName: string;
    docPath: string;
    docWebIndex: string;
}

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    let docList = fs.File.fromPath(folder.path + '/doc_list.json')
    page.bindingContext = new ViewModel();
}
```

JSON
-------------------
```json
{
    "docName": "Cordova",
    "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Cordova.zip?raw=true",
    "docWebIndex": "cordova.apache.org/docs/en/latest/index.html"
}
```

XML
-------------------
```xml
<TabViewItem.view>
    <ListView items="{{ officialDocListItems }}" itemTap="{{ onItemTap }}" >
        <ListView.itemTemplate>
            <Label text="{{ docName || 'Downloading...' }}" textWrap="true" class="docName" />
        </ListView.itemTemplate>
    </ListView>
</TabViewItem.view>
```

What went successfull
-----------------------
The display of documentation
and binding the listing to the app

What didn't went successfull
-----------------------------
- The Format(tgz)

Tech Stack
------------------------
- [NativeScript](nativescript.org)
- [TypeScript](https://www.typescriptlang.org)
- Coded in [Vim](vim.org/scripts)

What is left(for the afternoon)
--------------------------------
- Progress Bar
- Finish putting up the other docs
- Indexing

Get it now
-------------
[Get it on Github](https://github.com/juliosueiras/docbrowse)
