import{a as p,S as g,i as v}from"./assets/vendor-CSTHH2rc.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const L={key:"48326966-0a5fa166f497e375098be0f90",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15},y=(a,e)=>p.get("https://pixabay.com/api/",{params:{...L,q:a,page:e}}),h=a=>a.hits.map(e=>`<li class='gallery-item'>
            <a href='${e.largeImageURL}'><img class='gallery-img' src='${e.webformatURL}' alt='${e.tags}'></a>
            <ul class='user-activity'>
                <li class='user-activity-item'><span class='user-activity-header'>Likes</span>${e.likes}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Views</span>${e.views}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Comments</span>${e.comments}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Downloads</span>${e.downloads}</li>
            </ul>
        </li>`),m=document.querySelector(".search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".loader"),c=document.querySelector(".load-more"),f=new g(".gallery a",{captionsData:"alt"}),u=a=>{v.error({title:"",message:a,position:"topRight"})},i={query:"",page:1,totalHits:0},w=async a=>{a.preventDefault();const e=m.query.value;i.query=e,i.page=1,l.innerHTML="",n.classList.remove("el-hidden");try{const s=await y(e,1),o=h(s.data);if(i.totalHits=s.data.totalHits,o.length>0)l.innerHTML=o.join(""),f.refresh(),i.totalHits>15&&c.classList.remove("el-hidden");else throw new Error("Sorry, there are no images matching your search query. Please try again!")}catch(s){u(s.message)}finally{n.classList.add("el-hidden")}},b=async a=>{try{c.classList.add("el-hidden"),n.classList.remove("el-hidden");const e=await y(i.query,++i.page),s=h(e.data);if(s.length>0){const o=l.lastChild.getBoundingClientRect().height*2;l.insertAdjacentHTML("beforeend",s.join("")),window.scrollBy({top:o,left:0,behavior:"smooth"}),f.refresh(),s.length<15?u("We're sorry, but you've reached the end of search results."):c.classList.remove("el-hidden")}else throw new Error("We're sorry, but you've reached the end of search results.")}catch(e){u(e.message)}finally{n.classList.add("el-hidden")}};m.addEventListener("submit",w);c.addEventListener("click",b);
//# sourceMappingURL=index.js.map
