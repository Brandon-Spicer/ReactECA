(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),l=a.n(i),s=(a(13),a(1)),o=a(2),c=a(5),u=a(4),h=a(3);var v=function(e){return r.a.createElement("button",{className:e.className,onClick:e.onClick},e.label)};var m=function(e){var t=e.alive?"#ff5638":"white";return r.a.createElement("div",{className:"square",style:{"background-color":t,"box-sizing":"border-box"}})},f=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(s.a)(this,a),t.call(this,e)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("button",{className:"buttonSquare",style:{"background-color":this.props.alive?"#ff5638":"#e0e0e0"},onClick:this.props.onClick})}}]),a}(r.a.Component),p=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"renderSquares",value:function(){for(var e=this,t=this.props.view.length,a=this.props.view[0].length,n=this.props.viewIter,i=this.props.iteration,l=[],s=0;s<t;s++){var o=[],c=Math.min(n-1,t-1);if(n==i&&s==c)for(var u=function(t){o.push(r.a.createElement(f,{key:(10*s+t).toString(),alive:e.props.view[s][t],onClick:function(){return e.props.onClick(t)}}))},h=0;h<a;h++)u(h);else for(var v=0;v<a;v++)o.push(r.a.createElement(m,{key:(10*s+v).toString(),alive:this.props.view[s][v]}));l.push(r.a.createElement("div",{className:"row"},o))}return l}},{key:"render",value:function(){return this.renderSquares()}}]),a}(r.a.Component),w=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={value:"126"},n.handleChange=n.handleChange.bind(Object(c.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){this.props.onSubmit(this.state.value),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",value:this.state.value,style:{width:"30px"},onChange:this.handleChange}),r.a.createElement("input",{type:"submit",value:"submit"}))}}]),a}(r.a.Component),d=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(s.a)(this,a),(n=t.call(this,e)).state={rule:126,ruleMap:Array(8),history:[],view:[],iteration:1,viewIter:1,nRow:40,nCell:80};var r=n.state.nRow,i=n.state.nCell,l=Array(i).fill(0);l[Math.floor(i/2)]=1,n.state.history[0]=l,n.state.view[0]=l;for(var o=1;o<r;o++)n.state.view.push(Array(i).fill(0));for(var u=0;u<8;u++)n.state.ruleMap[u]=Math.floor(n.state.rule/Math.pow(2,u))%2;return n.forward=n.forward.bind(Object(c.a)(n)),n.rewind=n.rewind.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"forward",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=this.state.iteration,a=this.state.viewIter,n=this.state.history,r=this.state.view,i=this.state.nRow,l=n[n.length-1],s=l.slice(),o=0;o<e;o++)if(a==t){for(var c=0;c<l.length;c++){var u=[];u[0]=0===c?l[l.length-1]:l[c-1],u[1]=l[c],c===l.length-1?u[2]=l[0]:u[2]=l[c+1];var h=u[0];h+=2*u[1],h+=4*u[2],s[c]=this.state.ruleMap[h]}t<i?r[t]=s:r=r.slice(1).concat([s]),s=(l=(n=n.concat([s]))[n.length-1]).slice(),t+=1,a+=1}else a+=1,r=n.slice(a-i,a);this.setState({view:r,history:n,viewIter:a,iteration:t})}},{key:"rewind",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=this.state.viewIter,a=this.state.history,n=this.state.view,r=this.state.nRow,i=0;i<e;i++)t>r&&(t-=1,n=a.slice(t-r,t));this.setState({view:n,viewIter:t})}},{key:"JumpToStart",value:function(){var e=this.state.history,t=this.state.nRow;this.state.viewIter>t&&this.setState({view:e.slice(0,t),viewIter:t})}},{key:"JumpToEnd",value:function(){var e=this.state.history,t=this.state.nRow;this.state.viewIter>=t&&this.setState({view:e.slice(e.length-t,e.length),viewIter:e.length})}},{key:"ruleChange",value:function(e){for(var t=this.state.ruleMap,a=0;a<8;a++)t[a]=Math.floor(e/Math.pow(2,a))%2;this.setState({rule:parseInt(e),ruleMap:t})}},{key:"reset",value:function(){for(var e=this.state.history,t=this.state.nRow,a=this.state.nCell,n=e.slice(0,1),r=e.slice(0,1),i=1;i<t;i++)r[i]=Array(a).fill(0);this.setState({history:n,iteration:1,viewIter:1,view:r})}},{key:"changeSquare",value:function(e){this.state.viewIter,this.state.nRows;var t=this.state.view,a=this.state.history,n=a[a.length-1],r=Math.min(this.state.viewIter-1,this.state.nRows-1);n[e]=1^n[e],t[r]=n,a[a.length-1]=n,this.setState({history:a,view:t})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"content-wrapper"},r.a.createElement("div",{className:"grid"},r.a.createElement(p,{view:this.state.view,viewIter:this.state.viewIter,iteration:this.state.iteration,onClick:function(t){return e.changeSquare(t)}})),r.a.createElement("div",{className:"button-wrapper clearfix"},r.a.createElement("div",{className:"formContainer"},r.a.createElement(w,{onSubmit:function(t){return e.ruleChange(t)}})),r.a.createElement(v,{className:"controlButton",label:"Next",onClick:function(){return e.forward()}}),r.a.createElement(v,{className:"controlButton",label:"Back",onClick:function(){return e.rewind()}}),r.a.createElement(v,{className:"controlButton",label:"Next 10",onClick:function(){return e.forward(10)}}),r.a.createElement(v,{className:"controlButton",label:"Back 10",onClick:function(){return e.rewind(10)}}),r.a.createElement(v,{className:"controlButton",label:"Jump to start",onClick:function(){return e.JumpToStart()}}),r.a.createElement(v,{className:"controlButton",label:"Jump to end",onClick:function(){return e.JumpToEnd()}}),r.a.createElement(v,{className:"controlButton",label:"Reset",onClick:function(){return e.reset()}})),r.a.createElement("div",{className:"infoContainer"},r.a.createElement("table",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Rule:"),r.a.createElement("td",null,this.state.rule)),r.a.createElement("tr",null,r.a.createElement("td",null,"Gens:"),r.a.createElement("td",null,this.state.iteration)),r.a.createElement("tr",null,r.a.createElement("td",null,"Index:"),r.a.createElement("td",null,this.state.viewIter)))))}}]),a}(r.a.Component);l.a.render(r.a.createElement(d,null),document.getElementById("root"))},8:function(e,t,a){e.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.8e80d3d4.chunk.js.map