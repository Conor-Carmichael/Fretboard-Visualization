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

    equalData(node){
        if(this.getData().length !== node.getData().length){
            return false;
        }
        else{
            for(var i=0;i<this.getData().length; i++){
                if(this.getData()[i] !== node.getData()[i] ){
                    return false;
                }
            }
            return true;
        }
    }

}