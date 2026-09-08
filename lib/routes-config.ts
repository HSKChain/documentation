// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
  isSeparator?: boolean; // adds a separator line below this section
  collapsible?: boolean; // controls whether the menu item is collapsible
  externalLink?: boolean; // marks an external link
};

export const ROUTES: EachRoute[] = [
  {
    title: "About HSKChain",
    href: "/About-HashKey-Chain",
    isSeparator: true,
  },
  {
    title: "Developer QuickStart",
    href: "/Developer-QuickStart",
    isSeparator: true,  
  },
  {
    title: "Notices",
    href: "/Notices",
    noLink: true,
    isSeparator: true,
    items: [
      { title: "Jovian Network Upgrade", href: "/Jovian-Upgrade" },
    ],
  },
  {
    title: "Build on HSKChain",
    href: "/Build-on-HashKey-Chain",
    noLink: true,
    isSeparator: true, 
    items: [
      { title: "Network Info", href: "/network-info" },
      { title: "Token Contracts", href: "/Token-Contracts" },
      { title: "Contract Addresses", href: "/Contract-Addresses" },
      { title: "Tools", href: "/Tools", noLink: true,
        items: [
          { title: "Explorer", href: "/Explorer" },
          { title: "Wallets", href: "/Wallet" },
          { title: "Faucet", href: "/Faucet" },
          { title: "Safe", href: "/Safe" },
          { title: "Oracle", href: "/Oracle" },
          { title: "Bridges", href: "/Bridges" },
          { title: "KYC", href: "/KYC" },
          { title: "Subgraph", href: "/Subgraph" },
        ],
      },
      { title: "Fee", href: "/Fee" },
      { title: "RPC & Node Provider", href: "/RPC-Node-Provider" },
      { title: "Flashblocks", href: "/Flashblocks" },
    ],
  },{
    title: "Learn",
    href: "/Learn",
    noLink: true,
    isSeparator: true,
    items: [
      { title: "Welcome", href: "/Welcome" },
      { title: "Bitcoin-and-Blockchain", href: "/Bitcoin-and-Blockchain" },
      { title: "Ethereum-More", href: "/Ethereum-More", noLink: true,
        items: [
          { title: "Introduction", href: "/Introduction" },
          { title: "Ethereum-Technology", href: "/Ethereum-Technology" },
          { title: "Ethereum-Applications", href: "/Ethereum-Applications" },
          { title: "Gas-Fee-Calculation", href: "/Gas-Fee-Calculation" },
          { title: "Explorer-Wallet", href: "/Explorer-Wallet" },
        ]
      },
    ],
  },
  {
    title: "Knowledge",
    href: "/Knowledge",
  },
  {
    title: "Feedback",
    href: "/Feedback",
    noLink: true,
    items: [
      { 
        title: "Get help", 
        href: "https://discord.com/invite/V7kypNm9cS",
        externalLink: true
      },
      { 
        title: "Apply for Grants", 
        href: "https://github.com/orgs/HashkeyHSK/discussions/categories/session-1",
        externalLink: true
      },
      {
        title: "Bug bounty",
        href: "https://github.com/orgs/HashkeyHSK/discussions/categories/bug-bounty",
        externalLink: true,
      },
    ],
  },
];

type Page = { 
  title: string; 
  href: string; 
  externalLink?: boolean; 
};

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  // only add this item when it is not a noLink or external link (isSeparator check removed)
  if (!node.noLink && !node.externalLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    // keep href unchanged for external links
    const href = subNode.externalLink ? subNode.href : `${node.href}${subNode.href}`;
    const temp = { ...subNode, href };
    // add all child links to the result, carrying the externalLink flag
    const childLinks = getRecurrsiveAllLinks(temp);
    // make sure the externalLink flag is set for external links
    if (subNode.externalLink) {
      childLinks.forEach(link => {
        link.externalLink = true;
      });
    }
    ans.push(...childLinks);
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
