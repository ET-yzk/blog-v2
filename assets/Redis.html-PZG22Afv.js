import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as l,f as o}from"./app-HHaGRXeI.js";const a={},r=o('<h1 id="redis-缓存问题解释" tabindex="-1"><a class="header-anchor" href="#redis-缓存问题解释" aria-hidden="true">#</a> Redis 缓存问题解释</h1><p>2种可持续化策略</p><hr><h2 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩" aria-hidden="true">#</a> <strong>缓存雪崩</strong></h2><p>是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至宕机。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。</p><blockquote><p>面试官追问：缓存雪崩有什么解决方法？</p></blockquote><ol><li>缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。</li><li>采用 Redis 集群。如果缓存数据库是分布式部署，将热点数据均匀分布在不同的缓存数据库中，避免单机出现问题整个缓存服务都没办法使用。</li><li>设置热点数据永远不过期。</li></ol><h2 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿" aria-hidden="true">#</a> <strong>缓存击穿</strong></h2><p>是指某一个热点数据缓存中没有但数据库中有数据（一般是缓存时间到期）。这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力。</p><blockquote><p>面试官追问：缓存击穿你会怎么解决？</p></blockquote><ol><li>设置热点数据永远不过期。</li><li>接口限流与熔断，降级。重要的接口一定要做好限流策略，防止用户恶意刷接口，同时要降级准备，当接口中的某些服务不可用时候，进行熔断，失败快速返回机制。</li><li>设置互斥锁。在并发的多个请求中，只有第一个请求线程能拿到锁并执行数据库查询操作，其他的线程拿不到锁就阻塞等着，等到第一个线程将数据写入缓存后，直接走缓存。（可以使用 Redis 分布式锁）</li></ol><h2 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> <strong>缓存穿透</strong></h2><p>是指缓存和数据库中都没有的数据。此时请求会直接打到数据库上，并且数据库查不到数据，也没办法写入缓存，所以下一次请求同样会打到数据库上。此时，缓存起不到作用，请求每次都会走到数据库，流量大时数据库可能会被打挂。此时缓存就好像被“穿透”了一样，起不到任何作用！</p><p>举个例子：某个黑客故意制造我们缓存中不存在的 key 发起大量请求，导致大量请求落到数据库。</p><blockquote><p>面试官追问：缓存穿透怎么解决？</p></blockquote><ol><li>接口层增加校验。如用户鉴权校验，id做基础校验，id&lt;=0的直接拦截。</li><li>缓存无效key。从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击。</li><li>布隆过滤器。bloomfilter就类似于一个hash set，用于快速判某个元素是否存在于集合中，其典型的应用场景就是快速判断一个key是否存在于某容器，不存在就直接返回。布隆过滤器的关键就在于hash算法和容器大小。</li></ol>',16),t=[r];function s(d,h){return i(),l("div",null,t)}const p=e(a,[["render",s],["__file","Redis.html.vue"]]);export{p as default};
