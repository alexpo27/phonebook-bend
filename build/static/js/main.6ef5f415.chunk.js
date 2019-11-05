(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=(t(19),t(2)),i=function(e){var n=e.getList;return r.a.createElement("div",null,n())},l=function(e){var n=e.addDetails,t=e.newName,a=e.handleNameChange,c=e.newNumber,o=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("div",null,r.a.createElement("div",null,"filter with"),r.a.createElement("input",{value:n,onChange:t}))},f=t(3),s=t.n(f),d="/api/persons",h=function(){return s.a.get(d).then(function(e){return e.data})},b=function(e){return s.a.post(d,e).then(function(e){return e.data})},v=function(e){return s.a.delete("".concat(d,"/").concat(e))},E=function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})},g=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{className:"success"},n)},p=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),f=Object(u.a)(o,2),s=f[0],d=f[1],w=Object(a.useState)(""),j=Object(u.a)(w,2),O=j[0],N=j[1],k=Object(a.useState)(""),C=Object(u.a)(k,2),S=C[0],y=C[1],T=Object(a.useState)(""),D=Object(u.a)(T,2),B=D[0],F=D[1],I=Object(a.useState)(""),J=Object(u.a)(I,2),L=J[0],P=J[1];Object(a.useEffect)(function(){h().then(function(e){c(e)})},[]);var W=t.map(function(e){return e.name}),x=function(e){window.confirm("Delete ".concat(e.name,"?"))&&v(e.id).then(function(n){c(t.filter(function(n){return n.id!==e.id})),P("Removed ".concat(e.name)),setTimeout(function(){P("")},5e3)}).catch(function(n){console.log(n),F("Information of ".concat(e.name," has already been removed from server.")),setTimeout(function(){F("")},5e3)})},A=""===S?t:t.filter(function(e){return e.name.includes(S)});return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:L}),r.a.createElement(p,{message:B}),r.a.createElement(m,{filter:S,handleFilterChange:function(e){return y(e.target.value)}}),r.a.createElement("h2",null,"add new person"),r.a.createElement(l,{addDetails:function(e){e.preventDefault();var n={name:s,number:O.toString()};if(W.includes(s)){if(window.confirm("".concat(s," is already added to the phonebook, replace the old number with a new one?"))){var a=t.filter(function(e){return e.name===s})[0].id;E(a,n).then(function(e){c(t.filter(function(n){return n.id!==e.id}).concat(e)),P("Phone number for ".concat(e.name," has been updated!")),setTimeout(function(){P("")},5e3)}).catch(function(e){F(e.message),setTimeout(function(){F("")},5e3)})}}else b(n).then(function(e){c(t.concat(e)),P("Added ".concat(e.name)),setTimeout(function(){P("")},5e3)}).catch(function(e){F(e.response.data.error),setTimeout(function(){F("")},5e3)});d(""),N("")},newName:s,handleNameChange:function(e){return d(e.target.value)},newNumber:O,handleNumberChange:function(e){return N(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{getList:function(){return A.map(function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return x(e)}},"Delete"))})}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.6ef5f415.chunk.js.map