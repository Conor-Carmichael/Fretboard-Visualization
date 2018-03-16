class Node{

    constructor(data, next){
        this.data=data;
        this.next=next;
    }

    setData(d){
        this.data=d;
    }

    setNext(n){
        this.next=n;
    }

    getData(){
        return this.data;
    }

    getNext(){
        return this.next;
    }



}