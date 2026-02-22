import {renderHome} from "./feeds.js"
import {renderDiscover} from "./feeds.js"
import {renderSearch} from "./search.js"
import {renderProfile} from "./profile.js"

function go(route,param=null){
  if(route==="home") renderHome()
  if(route==="discover") renderDiscover()
  if(route==="search") renderSearch()
  if(route==="profile") renderProfile(param)
  if(route==="notifications") document.getElementById("app").innerHTML="<div class='card'>Em breve</div>"
}

export const router={go}
