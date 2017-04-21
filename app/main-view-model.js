"use strict";
var observable_1 = require("data/observable");
var nativescript_zip_1 = require("nativescript-zip");
var http = require("http");
var fs = require("file-system");
var frameModule = require("ui/frame");
var folder = fs.knownFolders.documents();
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this._officialDocList = [
            { "docName": "Bash", "docPath": "https://github.com/juliosueiras/temp_dashdocs_feed/blob/master/Bash.zip?raw=true", "docWebName": "bash/index.html" },
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
        var docPath = this._officialDocList[args.index].docPath;
        var docName = this._officialDocList[args.index].docName;
        var zipPath = fs.path.join(fs.knownFolders.temp().path, docName + ".zip");
        var dest = fs.path.join(fs.knownFolders.temp().path, "/" + docName);
        http.getFile(docPath, zipPath).then(function (res) {
            nativescript_zip_1.Zip.unzip(zipPath, dest);
            _this._currentDocPath = dest + '/' + docName + '.docset/Contents/Resources/Documents/' + _this._officialDocList[args.index].docWebIndex;
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
    ViewModel.prototype.getPathToIndex = function (args) {
        console.log(args);
        return this._currentDocPath;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFDM0MscURBQXFDO0FBQ3JDLDJCQUE0QjtBQUM1QixnQ0FBaUM7QUFDakMsc0NBQXVDO0FBQ3ZDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUE7QUFFeEM7SUFBK0IsNkJBQVU7SUFlckM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFoQk8sc0JBQWdCLEdBQUc7WUFDdkIsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLFNBQVMsRUFBRSxrRkFBa0YsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUM7WUFDbEosRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLFNBQVMsRUFBRSxxRkFBcUYsRUFBRSxhQUFhLEVBQUUscUNBQXFDLEVBQUM7WUFDN0ssRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFDLFNBQVMsRUFBRSx3RkFBd0YsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFDO1lBQzFKLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBQyxTQUFTLEVBQUUsdUZBQXVGLEVBQUUsYUFBYSxFQUFFLHNDQUFzQyxFQUFDO1NBQ3JMLENBQUE7UUFJTyxrQkFBWSxHQUFHO1lBQ25CLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxTQUFTLEVBQUUsaUZBQWlGLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBQztTQUMvSSxDQUFBOztJQUtELENBQUM7SUFFRCxzQkFBSSwyQ0FBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFBO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQWdCO2FBQXBCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDNUIsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBYSxHQUFwQixVQUFxQixJQUFJ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dEIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsT0FBTyxFQUFFO29CQUNMLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsS0FBSSxDQUFDLGVBQWU7aUJBQ2hDO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sa0NBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFBO0lBQy9CLENBQUM7SUFFTCxnQkFBQztBQUFELENBQUMsQUE5RUQsQ0FBK0IsdUJBQVUsR0E4RXhDO0FBOUVZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHtaaXB9IGZyb20gXCJuYXRpdmVzY3JpcHQtemlwXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmaWxlLXN5c3RlbSdcbmltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3VpL2ZyYW1lJ1xubGV0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKVxuXG5leHBvcnQgY2xhc3MgVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBfb2ZmaWNpYWxEb2NMaXN0ID0gW1xuICAgICAgICB7XCJkb2NOYW1lXCI6IFwiQmFzaFwiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL0Jhc2guemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViTmFtZVwiOiBcImJhc2gvaW5kZXguaHRtbFwifSxcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIkFuc2libGVcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9BbnNpYmxlLnppcD9yYXc9dHJ1ZVwiLCBcImRvY1dlYkluZGV4XCI6IFwiZG9jcy5hbnNpYmxlLmNvbS9hbnNpYmxlL2luZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJCYWNrYm9uZUpTXCIsXCJkb2NQYXRoXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvc3VlaXJhcy90ZW1wX2Rhc2hkb2NzX2ZlZWQvYmxvYi9tYXN0ZXIvQmFja2JvbmVKUy56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImluZGV4Lmh0bWxcIn0sXG4gICAgICAgIHtcImRvY05hbWVcIjogXCJBbmd1bGFySlNcIixcImRvY1BhdGhcIjogXCJodHRwczovL2dpdGh1Yi5jb20vanVsaW9zdWVpcmFzL3RlbXBfZGFzaGRvY3NfZmVlZC9ibG9iL21hc3Rlci9Bbmd1bGFySlMuemlwP3Jhdz10cnVlXCIsIFwiZG9jV2ViSW5kZXhcIjogXCJhbmd1bGFyLmlvL2RvY3MvanMvbGF0ZXN0L2luZGV4Lmh0bWxcIn0sXG4gICAgXVxuXG4gICAgcHJpdmF0ZSBfY3VycmVudERvY1BhdGg7XG5cbiAgICBwcml2YXRlIF91c2VyRG9jTGlzdCA9IFtcbiAgICAgICAge1wiZG9jTmFtZVwiOiBcIlNETFwiLFwiZG9jUGF0aFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9qdWxpb3N1ZWlyYXMvdGVtcF9kYXNoZG9jc19mZWVkL2Jsb2IvbWFzdGVyL1NETC56aXA/cmF3PXRydWVcIiwgXCJkb2NXZWJJbmRleFwiOiBcImluZGV4Lmh0bWxcIn1cbiAgICBdXG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldCBvZmZpY2lhbERvY0xpc3RJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZmljaWFsRG9jTGlzdFxuICAgIH1cblxuICAgIGdldCB1c2VyRG9jTGlzdEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckRvY0xpc3RcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwVXNlcihhcmdzKSB7XG4gICAgICAgIGxldCBkb2NQYXRoID0gdGhpcy5fdXNlckRvY0xpc3RbYXJncy5pbmRleF0uZG9jUGF0aFxuICAgICAgICBsZXQgZG9jTmFtZSA9IHRoaXMuX3VzZXJEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY05hbWVcbiAgICAgICAgbGV0IHppcFBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLnRlbXAoKS5wYXRoLCAgZG9jTmFtZSArIFwiLnppcFwiKVxuICAgICAgICBsZXQgZGVzdCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgsICBcIi9cIiArIGRvY05hbWUpXG5cbiAgICAgICAgaHR0cC5nZXRGaWxlKGRvY1BhdGgsIHppcFBhdGgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgWmlwLnVuemlwKHppcFBhdGgsIGRlc3QpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudERvY1BhdGggPSBkZXN0ICsgJy8nICsgZG9jTmFtZSArICcuZG9jc2V0L0NvbnRlbnRzL1Jlc291cmNlcy9Eb2N1bWVudHMvJyArIHRoaXMuX3VzZXJEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY1dlYkluZGV4XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9jdXJyZW50RG9jUGF0aClcbiAgICAgICAgICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogJ2RvYy12aWV3JyxcbiAgICAgICAgICAgICAgICBiYWNrc3RhY2tWaXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jTmFtZTogZG9jTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZG9jUGF0aDogdGhpcy5fY3VycmVudERvY1BhdGhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBsZXQgZG9jUGF0aCA9IHRoaXMuX29mZmljaWFsRG9jTGlzdFthcmdzLmluZGV4XS5kb2NQYXRoXG4gICAgICAgIGxldCBkb2NOYW1lID0gdGhpcy5fb2ZmaWNpYWxEb2NMaXN0W2FyZ3MuaW5kZXhdLmRvY05hbWVcbiAgICAgICAgbGV0IHppcFBhdGggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLnRlbXAoKS5wYXRoLCAgZG9jTmFtZSArIFwiLnppcFwiKVxuICAgICAgICBsZXQgZGVzdCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgsICBcIi9cIiArIGRvY05hbWUpXG5cbiAgICAgICAgaHR0cC5nZXRGaWxlKGRvY1BhdGgsIHppcFBhdGgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgWmlwLnVuemlwKHppcFBhdGgsIGRlc3QpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudERvY1BhdGggPSBkZXN0ICsgJy8nICsgZG9jTmFtZSArICcuZG9jc2V0L0NvbnRlbnRzL1Jlc291cmNlcy9Eb2N1bWVudHMvJyArIHRoaXMuX29mZmljaWFsRG9jTGlzdFthcmdzLmluZGV4XS5kb2NXZWJJbmRleFxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fY3VycmVudERvY1BhdGgpXG4gICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICdkb2MtdmlldycsXG4gICAgICAgICAgICAgICAgYmFja3N0YWNrVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY05hbWU6IGRvY05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRvY1BhdGg6IHRoaXMuX2N1cnJlbnREb2NQYXRoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGF0aFRvSW5kZXgoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKVxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudERvY1BhdGhcbiAgICB9XG5cbn0iXX0=