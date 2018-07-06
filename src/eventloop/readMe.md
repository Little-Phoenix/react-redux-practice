# 浅谈eventloop

 JavaScript是单线程，此为历史遗留问题，由于避免为浏览器操作增加复杂性，所以设计为单线程。
 但是由于是单线程，所有任务都在一个线程上完成，即排队执行任务。一旦遇到大量任务或者遇到一个耗时的任务，
 网页就会出现“假死”，因为JavaScript停不下来，也就无法响应用户的行为。


## 同步、异步
    
    同步：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。
    异步：不进入主线程、而进入“任务队列”（task queue）的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

## eventloop原理

 Eventloop是一个程序结构，用于等待和发送消息和事件。

 程序中设置两个线程：一个负责程序本身的运行，称为“主线程”；另一个负责主线程与其他进程的通信，被称为“EventLoop线程”即“消息线程”

 

### 经典面试题

```
            console.log('start')

            const interval = setInterval(() => {  
                console.log('setInterval')
            }, 0)

            setTimeout(() => {  
                console.log('setTimeout 1')
                Promise.resolve()
                    .then(() => {
                        console.log('promise 3')
                    })
                    .then(() => {
                        console.log('promise 4')
                    })
                    .then(() => {
                        setTimeout(() => {
                            console.log('setTimeout 2')
                            Promise.resolve()
                                .then(() => {
                                    console.log('promise 5')
                                })
                                .then(() => {
                                    console.log('promise 6')
                                })
                                .then(() => {
                                    clearInterval(interval)
                                })
                        }, 0)
                    })
            }, 0)

            Promise.resolve()
            .then(() => {  
                console.log('promise 1')
            })
            .then(() => {
                console.log('promise 2')
            })
```


### 答案
```
start 
promise 1 
promise 2 
setInterval 
setTimeout 1 
promise 3 
promise 4 
setInterval 
setTimeout 2 
promise 5 
promise 6
```

## setTimeout setInterval



## Promise mutationObserver

## microTask macroTask

## eventloop