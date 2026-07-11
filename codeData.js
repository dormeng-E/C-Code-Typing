export const problems = [

{
    id: 1,

    title: "Hello World",

    difficulty: 1,

    code: `#include <stdio.h>

int main()
{
    printf("Hello World\\n");
    return 0;
}`
},

{
    id: 2,

    title: "두 수의 합",

    difficulty: 2,

    code: `#include <stdio.h>

int main()
{
    int a, b;

    scanf("%d %d", &a, &b);

    printf("%d", a + b);

    return 0;
}`
},

{
    id: 3,

    title: "if문",

    difficulty: 3,

    code: `#include <stdio.h>

int main()
{
    int score;

    scanf("%d", &score);

    if(score >= 60)
    {
        printf("Pass");
    }
    else
    {
        printf("Fail");
    }

    return 0;
}`
},

{
    id: 4,

    title: "for문",

    difficulty: 4,

    code: `#include <stdio.h>

int main()
{
    int i;

    for(i = 1; i <= 10; i++)
    {
        printf("%d\\n", i);
    }

    return 0;
}`
},

{
    id: 5,

    title: "배열",

    difficulty: 5,

    code: `#include <stdio.h>

int main()
{
    int arr[5] = {1, 2, 3, 4, 5};

    int i;

    for(i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}`
}

];