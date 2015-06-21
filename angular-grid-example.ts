import {bootstrap, Component, View, NgFor, NgIf} from 'angular2/angular2';

@Component({
  selector: 'angular-grid-example'
})
@View({
  templateUrl: 'angular-grid-example.html',
  directives: [NgFor, NgIf]
})
export class AngularGridExample {
  users;
  selected;

  constructor() {
    this.users = [];
    const _this = this;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
        if(xhr.status == 200){
          var results = JSON.parse(xhr.responseText).results;
          _this.users = results.map((o, i) => {o.user.index = i; return o.user});
        }
      }
    }

    xhr.open("GET", "http://api.randomuser.me/?results=250", true);
    xhr.send();
  }

  select(event) {
    var grid = event.target;
    this.selected = this.users[grid.selection.selected()[0]];
  }
}

bootstrap(AngularGridExample);
