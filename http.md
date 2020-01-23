HTTP\浏览器:
https://www.cnblogs.com/chenwenhao/p/11267238.html



BFC ：https://segmentfault.com/a/1190000013023485
BFC(Block Formatting Context)块级格式化上下文，是用于布局块级盒子的一块渲染区域。MDN上的解释：BFC是Web页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。


浏览器与服务器，TCP和HTTP:
https://blog.csdn.net/gybshen/article/details/95618695


Q1:输入URL发生什么？

    DNS 域名解析（域名解析成ip地址，走UTP协议，因此不会有握手过程）：浏览器将 URL 解析出相对应的服务器的 IP 地址（1. 本地浏览器的 DNS 缓存中查找 2. 再向系统DNS缓存发送查询请求 3. 再向路由器DNS缓存 4. 网络运营商DNS缓存 5. 递归搜索），并从 url 中解析出端口号
    浏览器与目标服务器建立一条 TCP 连接（三次握手）
    浏览器向服务器发送一条 HTTP 请求报文
    服务器返回给浏览器一条 HTTP 响应报文
    浏览器进行渲染
    关闭 TCP 连接（四次挥手）
    

Q2:304过程？

    a. 浏览器请求资源时首先命中资源的Expires 和 Cache-Control，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效，可以通过Cache-control: max-age指定最大生命周期，状态仍然返回200，但不会请求数据，在浏览器中能明显看到from cache字样。
    
    b. 强缓存失效，进入协商缓存阶段，首先验证ETagETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据客户端上送的If-None-Match值来判断是否命中缓存。
    
    c. 协商缓存Last-Modify/If-Modify-Since阶段，客户端第一次请求资源时，服务服返回的header中会加上Last-Modify，Last-modify是一个时间标识该资源的最后修改时间。再次请求该资源时，request的请求头中会包含If-Modify-Since，该值为缓存之前返回的Last-Modify。服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。
    
    304介绍
    
Q3:HTTP状态码？
    
    1xx（临时响应）表示临时响应并需要请求者继续执行操作的状态码
        100 - 继续 请求者应当继续提出请求。服务器返回此代码表示已收到请求的第一部分，正在等待其余部分
        101 - 切换协议 请求者已要求服务器切换协议，服务器已确认并准备切换
    2xx（成功）表示成功处理了请求的状态码
        200 - 成功 服务器已经成功处理了请求。通常，这表示服务器提供了请求的网页
        201 - 已创建 请求成功并且服务器创建了新的资源
        202 - 已接受 服务器已接受请求，但尚未处理
        203 - 非授权信息 服务器已经成功处理了请求，但返回的信息可能来自另一来源
        204 - 无内容 服务器成功处理了请求，但没有返回任何内容
        205 - 重置内容 服务器成功处理了请求，但没有返回任何内容
        206 - 部分内容 服务器成功处理了部分GET请求
    3xx（重定向）表示要完成请求，需要进一步操作；通常，这些状态代码用来重定向
        300 - 多种选择 针对请求，服务器可执行多种操作。服务器可根据请求者（user agent）选择一项操作，或提供操作列表供请求者选择
        301 - 永久移动 请求的网页已永久移动到新位置。服务器返回此响应（对GET或HEAD请求的响应）时，会自动将请求者转到新位置
        302 - 临时移动 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
        303 - 查看其它位置 请求者应当对不同的位置使用单独的GET请求来检索响应时，服务器返回此代码
        304 - 未修改 自上次请求后，请求的网页未修改过。服务器返回此响应，不会返回网页的内容
        305 - 使用代理 请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理
        307 - 临时性重定向 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有的位置来进行以后的请求
    4xx（请求错误）这些状态码表示请求可能出错，妨碍了服务器的处理
        400 - 错误请求 服务器不理解请求的语法
        401 - 未授权 请求要求身份验证。对于需要登录的网页，服务器可能返回此响应
        403 - 禁止 服务器拒绝请求
        404 - 未找到 服务器找不到请求的网页
        405 - 方法禁用 禁用请求中指定的方法
        406 - 不接受 无法使用请求的内容特性响应请求的网页
        407 - 需要代理授权 此状态码与401（未授权）类似，但指定请求者应当授权使用代理
        408 - 请求超时 服务器等候请求时发生超时
        409 - 冲突 服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息
        410 - 已删除 如果请求的资源已永久删除，服务器就会返回此响应
        411 - 需要有效长度 服务器不接受不含有效内容长度标头字段的请求
        412 - 未满足前提条件 服务器未满足请求者在请求者设置的其中一个前提条件
        413 - 请求实体过大 服务器无法处理请求，因为请求实体过大，超出了服务器的处理能力
        414 - 请求的URI过长 请求的URI（通常为网址）过长，服务器无法处理
        415 - 不支持媒体类型 请求的格式不受请求页面的支持
        416 - 请求范围不符合要求 如果页面无法提供请求的范围，则服务器会返回此状态码
        417 - 未满足期望值 服务器未满足“期望”请求标头字段的要求
    5xx（服务器错误）这些状态码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错
        500 - 服务器内部错误 服务器遇到错误，无法完成请求
        501 - 尚未实施 服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码
        502 - 错误网关 服务器作为网关或代理，从上游服务器无法收到无效响应
        503 - 服务器不可用 服务器目前无法使用（由于超载或者停机维护）。通常，这只是暂时状态
        504 - 网关超时 服务器作为网关代理，但是没有及时从上游服务器收到请求
        505 - HTTP版本不受支持 服务器不支持请求中所用的HTTP协议版本
