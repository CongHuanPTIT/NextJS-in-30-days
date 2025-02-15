---
title: "Sử dụng useEffect() trong ReactHooks"
date: "July 4, 2021"
excerpt: "We will look at 10 simple tips and tricks to increase the speed of your code when writing JS"
cover_image: "/images/posts/img1.jpg"
category: "JavaScript"
author: "John Doe"
author_image: "https://randomuser.me/api/portraits/men/11.jpg"
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

- Hooks là một tính năng mới được thêm vào React 16.8. Nó cho phép bạn có thể sử dụng state và các chứ năng khác của React mà không cần khởi tạo Class, điều đó có nghĩa là có thể sử dụng state trong functional component.
- Effect Hook cho phép thực hiện side effect bên trong các function component.

1. React hook và useEffect() là gì?
2. Cách sử dụng useEffect() trong nhiều trường hợp
3. Tổng kết
4. Tư liệu tham khảo

## 1. React hook và useEffect() là gì?

Khi tham khảo tài liệu trên ReactJS offical và tìm kiếm về useEffect, mục đích useEffect để quản lý vòng đời của của một component và nó phục vụ chúng ta sử dụng trong _function component_ thay vì các _lifecycle_ như trước đây trong _class component_.

Lifecycle method trong class component thực sự rất quan trọng, đôi khi chúng ta muốn fetch dữ liệu từ API khi rendering 1 component, đôi khi chúng ta muốn thực hiện những action cụ thể khi component update,... 2 Methods được cho là quan trọng nhất chính là __componentDidMount__ và __componentDidUpdate__.

__useState__ cho phép chúng ta sử dụng state trong functional components. __useEffect__ cho phép chúng ta sử lý logic trong lifecycle methods. Từ cái tên __useEffect__ chắc chúng ta cũng hiểu được hàm sẽ được gọi mỗi khi có gì đó ảnh hưởng đến components của bạn. Và thực sự nó giống với định nghĩa của componentDidMount và componentDidUpdate.

## 2. Cách sử dụng useEffect() trong nhiều trường hợp

Hãy thử viết một vài đoạn code để tìm hiểu __useEffect()__. Chẳng hạn chúng ta muốn khai báo thuộc tính trong state của 1 object, và 2 thuộc tính đó là name và familyName. Initial state sẽ là "name" và "family" và sau khi rendering, component sẽ thay đổi.

First step: Khởi tạo states

    import React, {useState} from 'react';

    export const EffectDemo = () => {
        //State
        const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
        const [title,setTitle] = useState('useEffect() in Hooks');
        
        return(
            <div>
                <h1>Title: {title}</h1>
                <h3>Name: {fullName.name}</h3>
                <h3>Family Name: {fullName.familyName}</h3>
            </div>
        );
    };

Second Step: khai báo useEffect()

    import React, {useEffect, useState} from 'react';

    export const EffectDemo = () => {
        //State
        const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
        const [title,setTitle] = useState('useEffect() in Hooks');

        //useEffect
        useEffect(() => {
            setFullName({name:'TrungHC',familyName: 'HCT'});
        });

        return(
            <div>
                <h1>Title: {title}</h1>
                <h3>Name: {fullName.name}</h3>
                <h3>Family Name: {fullName.familyName}</h3>
            </div>
        );
    };

Như mọi người đã thấy, đối số của useEffect() là một hàm xử lý khi có gì thay đổi components. Sau đây là kết quả:    
![react-hook](/images/posts/react-hook1.png)

Như vậy kết quả đã như chúng ta mong muốn 😃 Tuy nhiên check log đã, xem hàm useEffect này được gọi bao nhiêu lần

