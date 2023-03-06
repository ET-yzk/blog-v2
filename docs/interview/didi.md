---

---

# 滴滴

## 测开

1. IOC和AOP，DI

   **区分**

   AOP、OOP在字面上虽然非常类似，但却是面向不同领域的两种设计思想。OOP（[面向对象编程](https://baike.baidu.com/item/面向对象编程)）针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的[逻辑单元](https://baike.baidu.com/item/逻辑单元)划分。

   而AOP则是针对业务处理过程中的切面进行提取，它所面对的是处理过程中的某个步骤或阶段，以获得逻辑过程中各部分之间低[耦合性](https://baike.baidu.com/item/耦合性)的隔离效果。这两种设计思想在目标上有着本质的差异。

   上面的陈述可能过于理论化，举个简单的例子，对于“雇员”这样一个[业务实体](https://baike.baidu.com/item/业务实体)进行封装，自然是OOP/OOD的任务，我们可以为其建立一个“Employee”类，并将“雇员”相关的属性和行为封装其中。而用AOP设计思想对“雇员”进行封装将无从谈起。

   同样，对于“权限检查”这一动作片断进行划分，则是AOP的目标领域。而通过OOD/OOP对一个动作进行封装，则有点不伦不类。

   换而言之，OOD/OOP面向名词领域，AOP面向动词领域。

   **关系**

   很多人在初次接触 AOP 的时候可能会说，AOP 能做到的，一个定义良好的 OOP 的接口也一样能够做到，我想这个观点是值得商榷的。AOP和定义良好的 OOP 的接口可以说都是用来解决并且实现需求中的横切问题的方法。但是对于 OOP 中的接口来说，它仍然需要我们在相应的模块中去调用该接口中相关的方法，这是 OOP 所无法避免的，并且一旦接口不得不进行修改的时候，所有事情会变得一团糟；AOP 则不会这样，你只需要修改相应的 Aspect，再重新编织（weave）即可。 当然，AOP 也绝对不会代替 OOP。核心的需求仍然会由 OOP 来加以实现，而 AOP 将会和 OOP 整合起来，以此之长，补彼之短。

2. 冒泡排序、归并排序、快排、选择排序、归并排序、最长重复子串

3. 如何理解容器

4. http和https，ssl建立连接过程

5. tcp3次握手，4次挥手

6. 