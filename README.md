# TitleBlock
A Web Component for a Header

The title web component provides a title block with a prefix, title, and subtitle. The prefix and subtitle are optional. The title may be truncated with an ellipsis and AP Title Case may be applied to the title.

[![npm: version][npm-badge]][npm-url]
[![license: ISC][license-badge]][license-url]

## Installation
```bash
npm install titleblock
```
## Usage
```html
<cloudinary-image
  base="https://res.cloudinary.com/<your-cloud-name>/image/upload/"
  imageid="<your-image-id>"
  alt="Your alt text"
></cloudinary-image>
```
  ## Attributes
  | Attribute | Description | Type | Default |
  | --------- | ----------- | ---- | ------- |
  | base | The base URL for your Cloudinary account | String | |
  | imageid | The image ID for your image | String | |
  | alt | The alt text for your image | String | |

  ## Styling
  The component exposes the following CSS Custom Properties for styling:
  | Property | Description | Default |
  | -------- | ----------- | ------- |
  | --image-height | The height of the image | 100% |

  The component will fill the available width. To control the height, you can set the --image-height CSS Custom Property. To cover the whole viewport for example:
  ```css
  cloudinary-image {
    --image-height: 100vh;
  }
  ```

  ## License
  [MIT](https://github.com/wernerglinka/cloudinaryImage/blob/main/LICENSE)

  ## Author
  [Werner Glinka](werner@glinka.co)

[npm-badge]: https://img.shields.io/npm/v/cloudinaryimage.svg
[npm-url]: https://www.npmjs.com/package/cloudinaryimage
[license-badge]: https://img.shields.io/github/license/wernerglinka/cloudinaryImage
[license-url]: LICENSE