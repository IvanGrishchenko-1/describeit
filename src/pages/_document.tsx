import { createStylesServer, ServerStyles } from '@mantine/next';
import Document, { DocumentContext } from 'next/document';

import { ltrCache } from '../../ltr-cache';

const stylesServer = createStylesServer(ltrCache);

export default class _Document extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };
  }
}
