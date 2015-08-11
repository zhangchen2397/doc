```freemarker
<#macro formatTime time>
    <#assign oneHourScds = 60 * 60 * 60>
    <#if (time <= 60)>
        ${time}秒
    <#elseif (time > 60 && time <= oneHourScds)>
        <#assign minute = (time / 60)?int>
        <#assign second = time - minute * 60>
        ${minute}分${second}秒
    <#else>
        <#assign hour = (time / oneHourScds)?int>
        <#assign minute = ((time - hour * oneHourScds) / 60)?int>
        <#assign second = time - hour * oneHourScds - minute * 60>
        ${hour}小时${minute}分${second}秒
    </#if>
</#macro>
```