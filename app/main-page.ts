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
