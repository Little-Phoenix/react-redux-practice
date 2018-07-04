
/**
 * 当model被修改时，对应的watcher会被推入update queue, 与此同时还会在异步队列中添加一个task用于flush
 * 当前的Update queue。这样一来，当前的task中的其他watcher会被推进同一个Update queue中。当前task执行结束后，
 * 异步队列下一个task执行，update queue会被flush，并进行后续的更新操作。
 * 
 * 为了让flush动作能在当前Task结束后尽可能早的开始，Vue会优先尝试将任务micro-task队列，具体来说，
 * 在浏览器环境中Vue会优先尝试使用MutationObserver API或Promise，如果两者都不可用，则fallback到setTimeout。
 * 对比两个框架可以发现React基于Transition实现的Batch Query是一个不依赖语言特性的通用模式，因此有更稳定可控的表现，
 * 但缺点是无法覆盖所有情况，例如对于如下代码
 *  componentDidMount () {
 *      setTimeout( _ => {
 *          this.setState({ foo: 1 });
 *          this.setState({ foo: 2 });
 *          this.setState({ foo: 3 });
 *      }, 0)
 *  }
 * 
 *  由于setTimeout的回调函数【不受React控制】，其中的setState就无法得到优化，最终会导致render函数执行三次。
 *  而Vue的实现则对语言特性乃至运行环境有很强的依赖，但可以更好的覆盖各种情况：只要实在同一个task中的修改就可以进行Batch Update优化。
 * 
 * 总结一下：
 *  React在这里的更新和事务机制使用比较通用的处理方式。
 *  比如默认第一次应用初始化的时候是一次事务的进行，在用户交互的时候是一次新的事务开始，会在同一次同步事务中标记batchUpdate=true,
 *  这样的做法是不破坏使用者的代码。
 * 
 *  然后如果是ajax，setTimeout等要离开主线程进行异步操作的时候会脱离当前UI的事务，这时候再进入此次处理的时候batchUpdate=false,
 *  所以才会setState几次就render几次。
 * 
 *  Vue的策略虽然在机制上雷同，但是从根本上来讲是一种延迟的批量更新机制。
 *  Angular在这里也处理的很巧妙，利用zone.js对task进行拦截，对JS现有场景进行AOP，这样就成功的桥接了代码。
 *  React的事务是纯粹的IO模型的适配。
 *  
 */
export function queueWatcher (watcher: Watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;

        if(!flushing) {
            queue.push(watcher)
        } else {

            let i = queue.length - 1;
            while (i > index && queue[i].id > watcher.id) {
                i--;
            }

            queue.splice(i + 1, 0, watcher);
        }

        if(!waiting) {
            waiting = true;
            nextTick (flushSchedulerQueue);
        }
    }
}