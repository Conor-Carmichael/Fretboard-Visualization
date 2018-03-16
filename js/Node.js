class Node{

    constructor(data, next ,description){
        this.data=data;
        this.description=description;
        this.next=next;
    }

    setData(d){
        this.data=d;
    }

    setDescr(d){
        this.description=d;
    }
    setNext(n){
        this.next=n;
    }

    getData(){
        return this.data;
    }
    getDescr(){
        return this.description;
    }

    getNext(){
        return this.next;
    }



}