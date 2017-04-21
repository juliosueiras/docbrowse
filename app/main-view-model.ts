import {Observable} from 'data/observable';
import {Zip} from "nativescript-zip";
import * as http from 'http'
import * as fs from 'file-system'
import * as frameModule from 'ui/frame'
let folder = fs.knownFolders.documents()

export class ViewModel extends Observable {
    private _officialDocList = [
        {"docName": "Bash","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Bash.zip?raw=true", "docWebIndex": "bash/index.html"},
        {"docName": "Ansible","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Ansible.zip?raw=true", "docWebIndex": "docs.ansible.com/ansible/index.html"},
        {"docName": "BackboneJS","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/BackboneJS.zip?raw=true", "docWebIndex": "index.html"},
        {"docName": "AngularJS","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/AngularJS.zip?raw=true", "docWebIndex": "angular.io/docs/js/latest/index.html"},
        {"docName": "Cordova","docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Cordova.zip?raw=true", "docWebIndex": "cordova.apache.org/docs/en/latest/index.html"},
    ]

    private _currentDocPath;

    private _userDocList = [
        {"docName": "SDL","docPath": "org.libsdl.sdl20.docset", "docWebIndex": "index.html"}
    ]


    constructor() {
        super();
    }

    get officialDocListItems() {
        return this._officialDocList
    }

    get userDocListItems() {
        return this._userDocList
    }

    public onItemTap(args) {
        let docPath = this._officialDocList[args.index].docPath
        let docName = this._officialDocList[args.index].docName
        let zipPath = "/sdcard/" + docName + ".zip"
        let dest = "/sdcard/" + docName

        http.getFile(docPath, zipPath).then((res) => {
            Zip.unzip(zipPath, dest);
            this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + this._officialDocList[args.index].docWebIndex
            console.log(this._currentDocPath)
            frameModule.topmost().navigate({
                moduleName: 'doc-view',
                backstackVisible: true,
                context: {
                    docName: docName,
                    docPath: this._currentDocPath
                }
            })
        }).catch(function(e) {
            console.dump(e)
        })
    }

    public getPathToIndex(args) {
        console.log(args)
        return this._currentDocPath
    }

}