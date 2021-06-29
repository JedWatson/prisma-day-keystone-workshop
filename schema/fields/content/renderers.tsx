import {
  DocumentRenderer as KeystoneDocumentRenderer,
  DocumentRendererProps,
} from '@keystone-next/document-renderer';
import { ComponentProps } from 'react';

import { H1, H2, H3, H4, H5, H6, P } from '../../../components/ui/typography';
import { Divider } from '../../../components/ui/layout';

// by default the DocumentRenderer will render unstyled html elements
// we're customising how headings are rendered here but you can customise any of the renderers that the DocumentRenderer uses
export const renderers: DocumentRendererProps['renderers'] = {
  block: {
    heading({ level, children, textAlign }) {
      switch (level) {
        case 1:
          return <H1 textAlign={textAlign}>{children}</H1>;
        case 2:
          return <H2 textAlign={textAlign}>{children}</H2>;
        case 3:
          return <H3 textAlign={textAlign}>{children}</H3>;
        case 4:
          return <H4 textAlign={textAlign}>{children}</H4>;
        case 5:
          return <H5 textAlign={textAlign}>{children}</H5>;
        default:
          return <H6 textAlign={textAlign}>{children}</H6>;
      }
    },
    paragraph({ children, textAlign }) {
      return <P textAlign={textAlign}>{children}</P>;
    },
    divider() {
      return <Divider />;
    },
  },
};

export function DocumentRenderer({
  document,
}: Pick<ComponentProps<typeof KeystoneDocumentRenderer>, 'document'>) {
  return <KeystoneDocumentRenderer document={document} renderers={renderers} />;
}
