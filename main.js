var a;
var b;
var c;
var dis;
var root1;
var root2;
var res=document.querySelector("#result");
var box1=res.innerHTML;


function findRoots(){
  a=parseInt(document.querySelector("#input-a").value);
  b=parseInt(document.querySelector("#input-b").value);
  c=parseInt(document.querySelector("#input-c").value);
  dis=b*b-4*a*c;
  if(a==0){
    root1=-c/b;
    root2=root1;
    root1=(Math.round(root1*100))/100;
    root2=(Math.round(root2*100))/100;
    dis="<p><br>The root of this Linear Equation is <strong> "+root1+"</strong>.</p>"
    if(b==0){
    dis="<p><br>This Equation has <strong>no real</strong> root.</p>";
    }
  }
  else if(dis>=0){
    dis=Math.sqrt(dis);
    root1=(dis-b)/(4*a);
    root2=-(dis+b)/(4*a);
    root1=(Math.round(root1*100))/100;
    root2=(Math.round(root2*100))/100;
    dis="<p><br>The roots of this Quadratic Equation are <strong> "+root1+" and "+root2+" </strong>.</p>"
  }
  else{
    dis="<p><br>This Quadratic Equation has <strong>no real</strong> roots.</p>";
  }
  res.innerHTML=box1+dis;
  document.querySelector("#input-a").value=a;
  document.querySelector("#input-b").value=b;
  document.querySelector("#input-c").value=c;
}




