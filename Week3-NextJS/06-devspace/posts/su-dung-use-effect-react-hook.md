---
title: "Sử dụng useEffect() trong ReactHooks"
date: "July 4, 2021"
excerpt: "Tìm hiểu về cách sử dụng useEffect() trong React Hooks. Đây là một tính năng mạnh mẽ của React để quản lý side effect trong các functional component."
cover_image: "/images/posts/img1.jpg"
category: "JavaScript"
author: "John Doe"
author_image: "https://randomuser.me/api/portraits/men/11.jpg"
---

**Hooks là một tính năng mới được thêm vào React 16.8. Nó cho phép bạn có thể sử dụng state và các chứ năng khác của React mà không cần khởi tạo Class, điều đó có nghĩa là có thể sử dụng state trong functional component.**

**Effect Hook cho phép thực hiện side effect bên trong các function component.**

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
![react-hook1](/images/posts/react-hook1.png)

Như vậy kết quả đã như chúng ta mong muốn 😃 Tuy nhiên check log đã, xem hàm useEffect này được gọi bao nhiêu lần

    import React, {useEffect, useState} from 'react';

    export const EffectDemo = () => {
        //State
        const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
        const [title,setTitle] = useState('useEffect() in Hooks');

        //useEffect
        useEffect(() => {
            console.log('useEffect has been called!');
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

![react-hook2](/images/posts/react-hook2.png)

Như vậy đúng như những gì chúng ta hiểu, __useEffect__ sẽ được gọi mỗi khi components thay đổi, 
tuy nhiên ở đây thì đó không phải là thứ mà chúng ta mong muốn, 
hiện tại useEffect đang là một method giống như hàm __componentDidUpdate__ vậy. 
Để cho giống với __componentDidUpdate__ thực sự thì chúng ta cũng có thể điều khiển hàm __useEffect__ 
bằng câu lệnh điều kiện, nó chính là tham số thứ 2 của hàm __useEffect()__. 
Tham số thứ 2 của __useEffect__ là một mảng, mảng này cho biết rõ chỉ gọi __useEffect()__ 
khi giá trị phần tử trong mảng thay đổi. Chẳng hạn:

    useEffect(() => {
        console.log('useEffect has been called!');
        setFullName({ name: 'TrungHC', familyName: 'HCT' });
    }, [fullName.name]);


Như vậy hàm __useEffect()__ chỉ được gọi 2 lần: 
1 lần khi render components, 1 lần khi set name thành "TrungHC".

Vậy nếu chúng ta muốn hàm __useEffect()__ chỉ gọi 1 lần khi render components 
(tương đương với __componentDidMount__) thì như thế nào? 
Trong trường hợp này ta chỉ cần truyền tham số thứ 2 của __useEffect()__ là 1 hàm rỗng []:

    useEffect(() => {
        console.log('useEffect has been called!');
        setFullName({ name: 'TrungHC', familyName: 'HCT' });
    }, []);

Với hàm này thì __useEffect()__ sẽ giống hệt với __componentDidMount__

![react-hook3](/images/posts/react-hook3.png)

Và Lifecycle cuối cùng cũng hay sử dụng nữa là hàm __componentWillUnmount__, 
chúng ta cũng có thể sử dụng __useEffect()__ định nghĩa hàm __componentWillUnmount__.

Như chúng ta đã biết thì __componentWillUnmount__ sẽ chạy mỗi khi một component 
chuẩn bị remove khỏi tree DOM, cùng xét 1 ví dụ:

    () => {
        useEffect(() => {
            const clickWindow = () => console.log('1')
            window.addEventListener('click', clickWindow)

            // return 1 function, sẽ được gọi ngay trước khi componentWillUnmount
            return () => {
            window.removeEventListener('click', clicked)
            }
        }, [])

        return <div>F12 check log của trình duyệt!</div>
    }

Thực tế thì __useEffect__ cho phép chúng ta return 1 function, 
function này sẽ thực thi trước khi mà component đó được Unmount.

## 4. Tổng kết
Như vậy với ReactHooks thì chúng ta gần như đã xử lý được state trong functional components, 
những method cơ bản trong lifecycle đã được giải quyết với __useEffect()__. 
Hy vọng qua bài viết này mọi người đã hiểu qua được cách sử dụng __useEffect()__.

## 5. Tư liệu tham khảo
- [ReactJS](https://reactjs.org/docs/hooks-effect.html)
- [React Hooks: How to use useEffect](https://javascript.plainenglish.io/react-hooks-how-to-use-useeffect-ecea3e90d84f)