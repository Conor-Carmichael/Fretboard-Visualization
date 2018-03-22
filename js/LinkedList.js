class LinkedList{

    constructor(length, head, tail){
        this. length = 0;
        this.head = null;
        this.tail = null;
    }

    showList(){
        var curr = this.head;
        while (curr!==null){
            curr=curr.getNext();
        }
    }

    add(node) {
        if(this.length===0){
            this.head=node;
            this.tail=node;
            this.length++;
        }
        else{
            this.tail.setNext(node);
            this.tail = node;
        }
        this.length++;
    }

    removeHead(){
        if(this.length===0){
            return null;
        }
        else{
            var temp = this.head;
            this.head = temp.next;
            temp.next=null;
            this.length--;
            return temp;
        }
        
    }

    contains(node){
        var t = this.head;
        while(t !== null){
            if(t.equalData(node)){
                return true;
            }
            t = t.getNext()
        }
        return false;
    }


    /**
     * 
     * x -> y -> z -> null
     * 
     */

    removeNode(node){
        var t = this.head;
        var p = null;
        while( t!==null &&  t.getData() !== node.getData()){
            console.log(t.getData()+"  ,  "+node.getData());
            p = t;
            t=t.getNext();
        }
        var temp =t.getNext();
        p.setNext(temp)
        t.setNext(null);
        t = null;
        return 0;
    }
       

    length(){
        return this.length;
    }

}