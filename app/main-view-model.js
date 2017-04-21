"use strict";
var observable_1 = require("data/observable");
var nativescript_zip_1 = require("nativescript-zip");
var http = require("http");
var fs = require("file-system");
var frameModule = require("ui/frame");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var folder = fs.knownFolders.documents();
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this._officialDocList = [
            { "docName": "Bash", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Bash.zip?raw=true", "docWebIndex": "bash/index.html" },
            { "docName": "Ansible", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Ansible.zip?raw=true", "docWebIndex": "docs.ansible.com/ansible/index.html" },
            { "docName": "BackboneJS", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/BackboneJS.zip?raw=true", "docWebIndex": "index.html" },
            { "docName": "AngularJS", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/AngularJS.zip?raw=true", "docWebIndex": "angular.io/docs/js/latest/index.html" },
        ];
        _this._userDocList = [
            { "docName": "SDL", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/SDL.zip?raw=true", "docWebIndex": "index.html" }
        ];
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "officialDocListItems", {
        get: function () {
            return this._officialDocList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "userDocListItems", {
        get: function () {
            return this._userDocList;
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.onItemTapUser = function (args) {
        var _this = this;
        var docPath = this._userDocList[args.index].docPath;
        var docName = this._userDocList[args.index].docName;
        var zipPath = fs.path.join(fs.knownFolders.temp().path, docName + ".zip");
        var dest = fs.path.join(fs.knownFolders.temp().path, "/" + docName);
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + _this._userDocList[args.index].docWebIndex;
            console.log(_this._currentDocPath);
            frameModule.topmost().navigate({
                moduleName: 'doc-view',
                backstackVisible: true,
                context: {
                    docName: docName,
                    docPath: _this._currentDocPath
                }
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ViewModel.prototype.onItemTap = function (args) {
        var _this = this;
        var loader = new nativescript_loading_indicator_1.LoadingIndicator();
        var docPath = this._officialDocList[args.index].docPath;
        var docName = this._officialDocList[args.index].docName;
        var zipPath = fs.path.join(fs.knownFolders.temp().path, docName + ".zip");
        var dest = fs.path.join(fs.knownFolders.temp().path, "/" + docName);
        loader.show();
        if (fs.File.exists(dest)) {
            this.changeToDocView(dest, docName, args);
            loader.hide();
            return;
        }
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this.changeToDocView(dest, docName, args);
            loader.hide();
        }).catch(function (e) {
            console.log(e);
        });
    };
    ViewModel.prototype.changeToDocView = function (dest, docName, args) {
        this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + this._officialDocList[args.index].docWebIndex;
        console.log(this._currentDocPath);
        frameModule.topmost().navigate({
            moduleName: 'doc-view',
            backstackVisible: true,
            context: {
                docName: docName,
                docPath: this._currentDocPath
            }
        });
    };
    ViewModel.prototype.getPathToIndex = function (args) {
        console.log(args);
        return this._currentDocPath;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFDM0MscURBQXFDO0FBQ3JDLDJCQUE0QjtBQUM1QixnQ0FBaUM7QUFDakMsc0NBQXVDO0FBQ3ZDLGlGQUErRDtBQUMvRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBRXhDO0lBQStCLDZCQUFVO0lBZXJDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaEJPLHNCQUFnQixHQUFHO1lBQ3ZCLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxTQUFTLEVBQUUsa0ZBQWtGLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFDO1lBQ25KLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxTQUFTLEVBQUUscUZBQXFGLEVBQUUsYUFBYSxFQUFFLHFDQUFxQyxFQUFDO1lBQzdLLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxTQUFTLEVBQUUsd0ZBQXdGLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQztZQUMxSixFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsU0FBUyxFQUFFLHVGQUF1RixFQUFFLGFBQWEsRUFBRSxzQ0FBc0MsRUFBQztTQUNyTCxDQUFBO1FBSU8sa0JBQVksR0FBRztZQUNuQixFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsU0FBUyxFQUFFLGlGQUFpRixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUM7U0FDL0ksQ0FBQTs7SUFLRCxDQUFDO0lBRUQsc0JBQUksMkNBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFnQjthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQzVCLENBQUM7OztPQUFBO0lBRU0saUNBQWEsR0FB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LEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFSSxtQ0FBZSxHQUF2QixVQUF3QixJQUFZLEVBQUUsT0FBZSxFQUFFLElBQUk7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNySSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzNCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsT0FBTyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDaEM7U0FDSixDQUFDLENBQUE7SUFDYixDQUFDO0lBRVMsa0NBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFBO0lBQy9CLENBQUM7SUFFTCxnQkFBQztBQUFELENBQUMsQUE3RkQsQ0FBK0IsdUJBQVUsR0E2RnhDO0FBN0ZZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHtaaXB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSdcbmltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3VpL2ZyYW1lJ1xuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCJcbmxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKClcblxuZXhwb3J0IGNsYXNzIFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX29mZmljaWFsRG9jTGlzdCA9IFtcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIkJhc2hcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9CYXNoLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiYmFzaC9pbmRleC5odG1sXCJ9LFxuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiQW5zaWJsZVwiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL0Fuc2libGUuemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJkb2NzLmFuc2libGUuY29tL2Fuc2libGUvaW5kZXguaHRtbFwifSxcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIkJhY2tib25lSlNcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9CYWNrYm9uZUpTLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiaW5kZXguaHRtbFwifSxcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIkFuZ3VsYXJKU1wiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL0FuZ3VsYXJKUy56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImFuZ3VsYXIuaW8vZG9jcy9qcy9sYXRlc3QvaW5kZXguaHRtbFwifSxcbiAgICBdXG5cbiAgICBwcml2YXRlIF9jdXJyZW50RG9jUGF0aDtcblxuICAgIHByaXZhdGUgX3VzZXJEb2NMaXN0ID0gW1xuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiU0RMXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvU0RMLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiaW5kZXguaHRtbFwifVxuICAgIF1cblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IG9mZmljaWFsRG9jTGlzdEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0XG4gICAgfVxuXG4gICAgZ2V0IHVzZXJEb2NMaXN0SXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyRG9jTGlzdFxuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1UYXBVc2VyKGFyZ3MpIHtcbiAgICAgICAgbGV0IGRvY1BhdGggPSB0aGlzLl91c2VyRG9jTGlzdFthcmdzLmluZGV4XS5kb2NQYXRoXG4gICAgICAgIGxldCBkb2NOYW1lID0gdGhpcy5fdXNlckRvY0xpc3RbYXJncy5pbmRleF0uZG9jTmFtZVxuICAgICAgICBsZXQgemlwUGF0aCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgsICBkb2NOYW1lICsgXCIuemlwXCIpXG4gICAgICAgIGxldCBkZXN0ID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy50ZW1wKCkucGF0aCwgIFwiL1wiICsgZG9jTmFtZSlcblxuICAgICAgICBodHRwLmdldEZpbGUoZG9jUGF0aCwgemlwUGF0aCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBaaXAudW56aXAoemlwUGF0aCwgZGVzdCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50RG9jUGF0aCA9IGRlc3QgKyAnLycgKyBkb2NOYW1lICsgJy5kb2NzZXQvQ29udGVudHMvUmVzb3VyY2VzL0RvY3VtZW50cy8nICsgdGhpcy5fdXNlckRvY0xpc3RbYXJncy5pbmRleF0uZG9jV2ViSW5kZXhcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2N1cnJlbnREb2NQYXRoKVxuICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiAnZG9jLXZpZXcnLFxuICAgICAgICAgICAgICAgIGJhY2tzdGFja1Zpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICBkb2NOYW1lOiBkb2NOYW1lLFxuICAgICAgICAgICAgICAgICAgICBkb2NQYXRoOiB0aGlzLl9jdXJyZW50RG9jUGF0aFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGxldCBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICAgICAgICBsZXQgZG9jUGF0aCA9IHRoaXMuX29mZmljaWFsRG9jTGlzdFthcmdzLmluZGV4XS5kb2NQYXRoXG4gICAgICAgIGxldCBkb2NOYW1lID0gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY05hbWVcbiAgICAgICAgbGV0IHppcFBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLnRlbXAoKS5wYXRoLCAgZG9jTmFtZSArIFwiLnppcFwiKVxuICAgICAgICBsZXQgZGVzdCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgsICBcIi9cIiArIGRvY05hbWUpXG5cbiAgICAgICAgbG9hZGVyLnNob3coKTsgXG5cblxuXHRcdGlmKGZzLkZpbGUuZXhpc3RzKGRlc3QpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRvRG9jVmlldyhkZXN0LCBkb2NOYW1lLCBhcmdzKVxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaHR0cC5nZXRGaWxlKGRvY1BhdGgsIHppcFBhdGgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgWmlwLnVuemlwKHppcFBhdGgsIGRlc3QpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUb0RvY1ZpZXcoZGVzdCwgZG9jTmFtZSwgYXJncylcbiAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdHByaXZhdGUgY2hhbmdlVG9Eb2NWaWV3KGRlc3Q6IHN0cmluZywgZG9jTmFtZTogc3RyaW5nLCBhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50RG9jUGF0aCA9IGRlc3QgKyAnLycgKyBkb2NOYW1lICsgJy5kb2NzZXQvQ29udGVudHMvUmVzb3VyY2VzL0RvY3VtZW50cy8nICsgdGhpcy5fb2ZmaWNpYWxEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY1dlYkluZGV4XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9jdXJyZW50RG9jUGF0aClcbiAgICAgICAgICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ2RvYy12aWV3JyxcbiAgICAgICAgICAgICAgICBiYWNrc3RhY2tWaXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jTmFtZTogZG9jTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZG9jUGF0aDogdGhpcy5fY3VycmVudERvY1BhdGhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXHR9XG5cbiAgICBwdWJsaWMgZ2V0UGF0aFRvSW5kZXgoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKVxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudERvY1BhdGhcbiAgICB9XG5cbn0iXX0=