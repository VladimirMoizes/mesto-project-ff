(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c){document.querySelector(".places__list");var a=e.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-text");return i.src=t.link,i.alt=t.name,u.textContent=t.name,t.owner._id!==c&&l.remove(),t.likes.some((function(e){return e._id===c}))&&s.classList.add("card__like-button_is-active"),d.textContent=t.likes.length,l.addEventListener("click",(function(){n(t,l)})),i.addEventListener("click",(function(){return r(t)})),s.addEventListener("click",(function(){o(t,s,d)})),a}var n=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");r(t)}},o=function(e){e.classList.add("popup_is-opened"),document.addEventListener("click",(function(t){t.target===e&&r(e)})),document.addEventListener("keydown",n)},r=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)},c=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},a=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},i=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){c(e,n,t)}))},u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"6eda4763-2669-4bcd-99f1-7d79fb7b6f08","Content-Type":"application/json"}},l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},s=function(){return fetch("".concat(u.baseUrl,"/users/me"),{method:"GET",headers:u.headers}).then(l)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var p=s().then((function(e){console.log(e)}));console.log(p);var f,_=document.querySelector(".profile__image"),m=document.querySelector(".popup_type_new-ava"),y=m.querySelector(".popup__close"),h=m.querySelector(".button"),v=m.querySelector(".popup__form"),b=v.querySelector('input[name="link"]'),S=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit"),g=q.querySelector(".popup__close"),E=q.querySelector(".popup__form"),L=E.querySelector('input[name="name"]'),k=E.querySelector('input[name="description"]'),C=q.querySelector(".button"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),w=document.querySelector(".popup_type_image"),O=w.querySelector(".popup__close"),T=w.querySelector(".popup__image"),j=w.querySelector(".popup__caption"),N=document.querySelector(".profile__add-button"),J=document.querySelector(".popup_type_new-card"),P=J.querySelector(".popup__close"),B=J.querySelector(".popup__form"),D=J.querySelector(".button"),I=B.querySelector('input[name="place-name"]'),M=B.querySelector('input[name="link"]'),G=document.querySelector(".places__list"),H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function V(e){T.src=e.link,T.alt=e.name,j.textContent=e.name,o(w)}document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),f=H,Array.from(document.querySelectorAll(f.formSelector)).forEach((function(e){return function(e,t){var n=Array.from(e),o=e.querySelector(t.submitButtonSelector);a(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),a(n,o,t)}))}))}(e,f)})),Promise.all([fetch("".concat(u.baseUrl,"/cards"),{method:"GET",headers:u.headers}).then(l),s()]).then((function(e){var n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];c.forEach((function(e){G.append(t(e,z,$,V,a._id))})),x.textContent=a.name,A.textContent=a.about,U.style.backgroundImage="url(".concat(a.avatar,")")})).catch((function(e){console.log(e)}));var z=function(e,t){t.closest(".places__item").remove(),function(e){return fetch("".concat(u.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:u.headers,body:JSON.stringify(e)}).then(l)}(e).catch((function(e){console.log(e)}))},$=function(e,t,n){t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:u.headers,body:JSON.stringify(e)}).then(l)}(e).then((function(e){t.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:u.headers,body:JSON.stringify(e)}).then(l)}(e).then((function(e){t.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))};O.addEventListener("click",(function(){return r(w)})),E.addEventListener("submit",(function(e){var t;e.preventDefault(),(t={name:L.value,about:k.value},fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify(t)}).then(l)).then(C.textContent="Сохранение...").then((function(e){x.textContent=e.name,A.textContent=e.about,r(q)})).catch((function(e){console.log(e)})).finally(C.textContent="Сохранить")})),v.addEventListener("submit",(function(e){e.preventDefault(),function(e){return fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify(e)}).then(l)}({avatar:b.value}).then(h.textContent="Сохранение...").then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log(e)})).finally(h.textContent="Сохранить"),r(m),v.reset()})),B.addEventListener("submit",(function(e){var n;e.preventDefault(),(n={name:I.value,link:M.value},fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify(n)}).then(l)).then(D.textContent="Сохранение...").then((function(e){G.prepend(t(e,z,$,V,e.owner._id))})).catch((function(e){console.log(e)})).finally(D.textContent="Сохранить"),r(J),B.reset()})),S.addEventListener("click",(function(){o(q),L.value=x.textContent,k.value=A.textContent,C.classList.remove("popup__button_disabled"),C.disabled=!1,i(q,H)})),N.addEventListener("click",(function(){o(J),D.classList.add("popup__button_disabled"),D.disabled=!0,i(J,H)})),_.addEventListener("click",(function(){o(m),h.classList.add("popup__button_disabled"),h.disabled=!0})),g.addEventListener("click",(function(){r(q)})),P.addEventListener("click",(function(){r(J)})),y.addEventListener("click",(function(){r(m)}))})();