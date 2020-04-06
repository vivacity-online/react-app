import React from 'react';
import sanitizeHtml from 'sanitize-html';
//   const textTags = [
//     'p', 
//     'h1',
//     'h2',
//     'h3',
//     'b', 
//     'i', 
//     'em', 
//     'strong', 
//     'a',
//     'table',
//     'div',
//     'th',
//     'tr',
//     'td',
//     'tbody',
//   ];
//   const mediaTags = [
//       'img',
//   ]
  
function SanitizeHTML(props){ 

    const sanitize = (dirty) => (
        { __html: 
        sanitizeHtml(dirty,{
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
            allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
            allowedIframeHostnames: ['www.youtube.com']
            }), 
        }
    );

    return (
        <div className={"editor-content"} dangerouslySetInnerHTML={sanitize(props.html)} />
        )
    };

export default SanitizeHTML;