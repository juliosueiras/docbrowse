import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as platform from "platform";
import * as fs from 'file-system'
import * as http from 'http'
import { ViewModel } from './main-view-model'; 
let folder = fs.knownFolders.documents()

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    console.log(args)
    let docList = fs.File.fromPath(folder.path + '/doc_list.json')
    page.bindingContext = page.navigationContext;
}

