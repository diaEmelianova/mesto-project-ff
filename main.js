!function(){"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-1",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"}},r=document.querySelector("#card"),c=document.querySelector(".popup__image"),a=document.querySelector(".popup__figcaption"),i=document.querySelector(".popup_image"),u=function(t,n,o,u,s,l){var d=r.content.cloneNode(!0),f=d.querySelector(".element__image"),p=d.querySelector(".element__delete"),m=d.querySelector(".element__like-counter"),h=d.querySelector(".element__like");return d.querySelector(".element__title").textContent=t,f.alt=t,f.src=n,m.textContent=u,o&&(p.style.display="block"),l&&h.classList.add("element__like_active"),h.addEventListener("click",(function(e){var t;e.target.classList.contains("element__like_active")?(t=s,fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(t),{method:"DELETE",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){e.target.classList.remove("element__like_active"),m.textContent=t.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(e),{method:"PUT",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(s).then((function(t){e.target.classList.add("element__like_active"),m.textContent=t.likes.length})).catch((function(e){console.log(e)}))})),p.addEventListener("click",(function(e){var t;(t=s,fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/".concat(t),{method:"DELETE",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){e.target.closest(".element").remove()})).catch((function(e){console.log(e)}))})),f.addEventListener("click",(function(o){c.setAttribute("src",n),c.setAttribute("alt",t),a.textContent=t,e(i)})),d};function s(e,t,n){e.classList.remove(n.inputErrorClass);var o="#".concat(e.name,"--error"),r=t.querySelector(o);r.classList.remove(n.errorElementClass),r.textContent=""}function l(e,t){e.disabled=!0,e.classList.add(t.disableButtonClass)}function d(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));l(e.querySelector(t.buttonSelector),t),n.forEach((function(n){s(n,e,t)}))}var f=document.querySelector(".profile__edit-button"),p=document.querySelector(".profile-popup"),m=document.querySelector(".profile-popup>.popup__form"),h=document.querySelector("#name"),_=document.querySelector("#job"),v=document.querySelector(".profile__title"),y=document.querySelector(".profile__subtitle"),b=document.querySelectorAll(".popup"),S=document.querySelector(".elements__item"),C=document.querySelector(".profile__add-button"),k=document.querySelector(".popup__add"),q=document.querySelector("#linkNewCard"),g=document.querySelector("#nameNewCard"),E=document.querySelector("#popupFormAddCard"),L=document.querySelector(".profile__avatar"),j=document.querySelector(".input__btn"),x=document.querySelector("#buttonCreateCard"),A=document.querySelector(".profile__edit-photo"),w=document.querySelector("#buttonAvatar"),P=document.querySelector("#linkAvatar"),T=document.querySelector(".popup__change-avatar"),z=document.querySelector("#popupChangeAvatar"),N={popup__formSelector:".popup__form",buttonSelector:".input__btn",inputSelector:".popup__text",inputErrorClass:"popup__text_invalid",errorElementClass:"popup__error-message_visible",disableButtonClass:"popup__button_disabled"};b.forEach((function(e){e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup_opened")&&t(e),n.target.classList.contains("button-close")&&t(e)}))})),f.addEventListener("click",(function(){h.value=v.textContent,_.value=y.textContent,d(m,N),e(p)})),m.addEventListener("submit",(function(e){e.preventDefault(),j.textContent="Сохранение...",function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me",{method:"PATCH",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}({name:h.value,about:_.value}).then((function(e){v.textContent=e.name,y.textContent=e.about,t(p)})).catch((function(e){console.log(e)})).finally((function(){return j.textContent="Сохранить"})),d(m,N)})),C.addEventListener("click",(function(){d(E,N),E.reset(),e(k)})),E.addEventListener("submit",(function(e){var n;e.preventDefault(),x.textContent="Создание...",(n={name:g.value,link:q.value},fetch("https://nomoreparties.co/v1/wff-cohort-1/cards",{method:"POST",body:JSON.stringify({name:n.name,link:n.link}),headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){S.prepend(u(e.name,e.link,!0,e.likes.length,e._id,!1)),t(k)})).catch((function(e){console.log(e)})).finally((function(){return x.textContent="Создать"})),d(e.target,N),e.target.reset()})),z.addEventListener("submit",(function(e){var n;e.preventDefault(),w.textContent="Сохранение...",(n=P.value,fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar",{method:"PATCH",headers:{authorization:"9cbb1215-3345-4775-9e5f-b3ff45cfa047","Content-Type":"application/json"},body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){L.src=e.avatar,t(T)})).catch((function(e){console.log(e)})).finally((function(){return w.textContent="Сохранить"})),d(z,N),e.target.reset()})),A.addEventListener("click",(function(){d(z,N),z.reset(),e(T)})),w.addEventListener("click",(function(){t(T)})),function(e){Array.from(document.querySelectorAll(e.popup__formSelector)).forEach((function(t){!function(e,t){var n=e.querySelector(t.buttonSelector),o=Array.from(e.querySelectorAll(t.inputSelector));o.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){console.log(e.validity.patternMismatch),e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?s(e,t,n):function(e,t,n){e.classList.add(n.inputErrorClass);var o="#".concat(e.name,"--error"),r=t.querySelector(o);r.classList.add(n.errorElementClass),r.textContent=e.validationMessage}(e,t,n)}(r,e,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.disabled=!1,e.classList.remove(t.disableButtonClass)}(e,n):l(e,n)}(n,o,t)}))}))}(t,e)}))}(N),Promise.all([fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t=e[1],n=e[0];v.textContent=t.name,y.textContent=t.about,L.src=t.avatar,n.forEach((function(e){var n=e.likes.some((function(e){return e._id===t._id}));S.append(u(e.name,e.link,t._id===e.owner._id,e.likes.length,e._id,n))})),console.log(e)}))}();