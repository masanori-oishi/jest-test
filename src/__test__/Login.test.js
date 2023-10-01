import { render,screen, waitFor } from "@testing-library/react"
import Login, { validateEmail } from "../Login"
import userEvent from "@testing-library/user-event";

describe("ログインコンポーネントをテストします", () => {
    test("ボタンが1つあるかどうか", async () => {
        render(<Login />);
        // findAllByRole関数で何の要素をテストするのか指定
        const buttonList = await screen.findAllByRole('button');
        // console.log(buttonList);

        // toHaveLengthで数をテストする
        expect(buttonList).toHaveLength(1);
    });


    test("Emailの失敗時のバリデーションチェック", () => {
        const testEmail = "masa.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });

    test("Emailの成功事のバリデーションチェック", () => {
        const testEmail = "masa@gmail.com";
        expect(validateEmail(testEmail)).toBe(true);
    });

    test("パスワードタイプの確認", () => {
        render(<Login />);
        const testPlaceholder = screen.getByPlaceholderText("パスワード入力");
        expect(testPlaceholder).toHaveAttribute("type","password");
    });

    test("メールアドレスを送信できるのかどうか", async () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        console.log(submitButton);

        const email = screen.getByPlaceholderText("メールアドレス入力");
        const password = screen.getByPlaceholderText("パスワード入力");

        // emailにmasa@gmail.comを入力
        userEvent.type(email, "masa@gmail.com");
        // passwordにabcdefを入力
        userEvent.type(password, "abcdef");

        userEvent.click(submitButton);
        
        await waitFor(() => {
            const userInfo = screen.getByText("masa@gmail.com");
            expect(userInfo).toBeInTheDocument();
        });
    });
});