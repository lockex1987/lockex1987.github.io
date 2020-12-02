// Should use Levenshtein algorithm (exactly problem)
// Insert, delete, update
public class LCS {

    private char[] X;
    private char[] Y;
    private char[] A;
    private char[] B;
    private int[][] F;
    private int m;
    private int n;
    private int size;

    private void init(String x, String y) {
        char[] a = x.toCharArray();
        char[] b = y.toCharArray();
        m = a.length;
        n = b.length;
        X = new char[m + 1];
        Y = new char[n + 1];
        for (int i = 1; i <= m; i++) {
            X[i] = a[i - 1];
        }
        for (int i = 1; i <= n; i++) {
            Y[i] = b[i - 1];
        }
        F = new int[m + 1][n + 1];
    }

    private void calculate() {
        int i, j;
        for (i = 0; i <= m; i++) {
            F[i][0] = 0;
        }
        for (j = 0; j <= n; j++) {
            F[0][j] = 0;
        }
        for (i = 1; i <= m; i++) {
            for (j = 1; j <= n; j++) {
                if (X[i] == Y[j]) {
                    F[i][j] = F[i - 1][j - 1] + 1;
                } else {
                    int v1 = F[i][j - 1];
                    int v2 = F[i - 1][j];
                    F[i][j] = (v1 > v2) ? v1 : v2;
                }
            }
        }
    }

    private String trace(int i, int j) {
        if (i == 0 || j == 0) {
            return "";
        } else if (X[i] == Y[j]) {
            return trace(i - 1, j - 1) + X[i];
        } else if (F[i][j - 1] > F[i - 1][j]) {
            return trace(i, j - 1);
        } else {
            return trace(i - 1, j);
        }
    }

    private String trace() {
        return trace(m, n);
    }

    private void printDiff(int i, int j) {
        if (i > 0 && j > 0 && X[i] == Y[j]) {
            printDiff(i - 1, j - 1);
//            System.out.print(X[i]);
            A[size] = X[i];
            B[size] = X[i];
            size++;
        } else if (j > 0 && (i == 0 || F[i][j - 1] >= F[i - 1][j])) {
            printDiff(i, j - 1);
//            System.out.print("+");
            A[size] = '+';
            B[size] = Y[j];
            size++;
        } else if (i > 0 && (j == 0 || F[i][j - 1] < F[i - 1][j])) {
            printDiff(i - 1, j);
//            System.out.print("-");
            A[size] = X[i];
            B[size] = '_';
            size++;
        }
    }
    
    private void printDiff() {
        A = new char[m + n + 1];
        B = new char[m + n + 1];
        size = 0;
        printDiff(m, n);
        System.out.println();
        for (int i = 0; i < size; i++) {
            System.out.print(A[i]);
        }
        System.out.println();
        for (int i = 0; i < size; i++) {
            System.out.print(B[i]);
        }
        System.out.println();
    }

    public static void main(String[] args) {
        String s1, s2;
        if (args.length > 1) {
            s1 = args[0];
            s2 = args[1];
        } else {
//            s1 = "PBBCEFATZ";
//            s2 = "QABCDABEFA";
            s1 = "Kỳ 1 khoán kinh doanh (10/2015 -> )";
            s2 = "Kỳ 1 khoán kinh doanh (08/2015 -> 09/2015)";
        }

        LCS obj = new LCS();
        obj.init(s1, s2);
        obj.calculate();
        
//        System.out.println(s1);
//        System.out.println(s2);
        obj.printDiff();
        
//        String r = obj.trace();
//        System.out.println(r);
    }
}

