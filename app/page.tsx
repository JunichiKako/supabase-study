import { signInWithGithub, signOut } from "@/actions/auth";
import { currentUser } from "@/data/auth";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="mt-10 p-6 border">
      {user ? (
        <form action={signOut}>
          <button>ログアウト</button>
        </form>
      ) : (
        <form action={signInWithGithub}>
          <button>GitHubでログイン</button>
        </form>
      )}
    </div>
  );
}

// data/auth.tsに定義したcurrentUser関数を使って、ユーザーがログインしているかどうかを確認します。
// ユーザーがログインしている場合は、ログアウトボタンを表示します。
// ユーザーがログインしていない場合は、GitHubでログインするためのボタンを表示します。
// ユーザーがログインしているかどうかを確認するために、currentUser関数を使っています。
// currentUser関数は、サーバー側で実行されるため、サーバー側でユーザーの情報を取得できます。

// ・そもそもなぜサーバーサイドで認証する必要があるのか？

// サーバーサイドで認証する理由は、セキュリティのためです。
// クライアント側で認証を行うと、認証情報がクライアント側に漏洩する可能性があります。
// どうやって漏洩するのか？
// クライアント側で認証を行うと、認証情報がブラウザのローカルストレージやクッキーに保存されます。
// そのため、認証情報が漏洩する可能性があります。
// サーバーサイドで認証を行うことで、認証情報を安全に保管できます。

// サーバーサイドでの認証は何を使って行うのか？

// サーバーアクションを使って認証を行います。
// サーバーアクションは、サーバーサイドで実行される関数です。

// actions/auth.tsには、signInWithGithub関数とsignOut関数が定義されています。
// signInWithGithub関数は、GitHubでログインするための関数です。
// signOut関数は、ログアウトするための関数です。
// 認証を完了するとRedirect URLが返されるので、そのURLにリダイレクトします。

// それはapp/auth/callback/route.tsに定義されています。
// GEメソッドになっており、それがcode=一時的な認証コードになっています。
// このコードを使って、searchparamsで認証情報を取得します。
// その認証情報をexchangeCodeForSession関数に渡して、セッションを取得します。

// セッションの維持はどうやって行うのか？

// "use server";
// "server-only";はどういう使い分け？

// "use server";は、サーバーサイドでのみ実行されるコードを記述するためのディレクティブです。
// "server-only";は、サーバーサイドでのみ実行されるコードを記述するためのディレクティブです。
// どちらもサーバーサイドでのみ実行されるコードを記述するために使いますが、
// "use server";は、ファイル全体に適用されるのに対して、"server-only";は、特定の関数に適用されます。
// "server-only"の場合はクライアントで実行される関数もファイル内ではある可能性がある？
// 例えば、"server-only";は、サーバーサイドでのみ実行される関数を記述するために使います。
// この関数は、クライアント側で実行されることはありません。
// 一方、"use server";は、サーバーサイドでのみ実行されるコードを記述するために使います。
// このコードは、ファイル全体に適用されます。
// つまり、"server-only";は、特定の関数に適用されるのに対して、"use server";は、ファイル全体に適用されます。

// 例えば、以下のように使い分けることができます。
// "use server";

// export const serverOnlyFunction = () => {
//   return "サーバーサイドでのみ実行される関数";
// };

// "server-only";

// export const serverOnlyFunction = () => {
//   return "サーバーサイドでのみ実行される関数";
// };

// export const clientOnlyFunction = () => {
//   return "クライアント側でのみ実行される関数";
// };

// この例では、serverOnlyFunction関数はサーバーサイドでのみ実行される関数です。

// 一方、clientOnlyFunction関数はクライアント側でのみ実行される関数です。

// このように、"use server";と"server-only";を使い分けることで、
// サーバーサイドでのみ実行されるコードを適切に記述することができます。
