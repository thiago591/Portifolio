import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public final class MaskUtils {
    private MaskUtils() {}

    public static String onlyDigits(String input) {
        if (input == null) return "";
        return input.replaceAll("\\D", "");
    }

    public static String formatPhone(String input) {
        String d = onlyDigits(input);
        if (d.isEmpty()) return "";
        if (d.length() <= 2) return "(" + d;
        if (d.length() <= 6) return "(" + d.substring(0, 2) + ") " + d.substring(2);
        if (d.length() <= 10) return "(" + d.substring(0, 2) + ") " + d.substring(2, 6) + "-" + d.substring(6);
        return "(" + d.substring(0, 2) + ") " + d.substring(2, 7) + "-" + d.substring(7, Math.min(11, d.length()));
    }

    public static boolean isValidPhone(String input) {
        String d = onlyDigits(input);
        return d.length() == 10 || d.length() == 11;
    }

    public static String formatCPF(String input) {
        String d = onlyDigits(input);
        if (d.isEmpty()) return "";
        if (d.length() <= 3) return d;
        if (d.length() <= 6) return d.substring(0, 3) + "." + d.substring(3);
        if (d.length() <= 9) return d.substring(0, 3) + "." + d.substring(3, 6) + "." + d.substring(6);
        return d.substring(0, 3) + "." + d.substring(3, 6) + "." + d.substring(6, 9) + "-" + d.substring(9, Math.min(11, d.length()));
    }

    public static boolean isValidCPF(String input) {
        String d = onlyDigits(input);
        if (d.length() != 11) return false;
        if (d.chars().distinct().count() == 1) return false;

        int sum1 = 0;
        for (int i = 0; i < 9; i++) sum1 += (d.charAt(i) - '0') * (10 - i);
        int r1 = sum1 % 11;
        int check1 = (r1 < 2) ? 0 : 11 - r1;
        if (check1 != d.charAt(9) - '0') return false;

        int sum2 = 0;
        for (int i = 0; i < 10; i++) sum2 += (d.charAt(i) - '0') * (11 - i);
        int r2 = sum2 % 11;
        int check2 = (r2 < 2) ? 0 : 11 - r2;
        return check2 == d.charAt(10) - '0';
    }

    public static String formatCEP(String input) {
        String d = onlyDigits(input);
        if (d.isEmpty()) return "";
        if (d.length() <= 5) return d;
        return d.substring(0, 5) + "-" + d.substring(5, Math.min(8, d.length()));
    }

    public static boolean isValidCEP(String input) {
        String d = onlyDigits(input);
        return d.length() == 8;
    }

    public static String formatBirthdate(String input) {
        String d = onlyDigits(input);
        if (d.isEmpty()) return "";
        if (d.length() <= 2) return d;
        if (d.length() <= 4) return d.substring(0, 2) + "/" + d.substring(2);
        String year = d.length() > 8 ? d.substring(4, 8) : d.substring(4);
        return d.substring(0, 2) + "/" + d.substring(2, 4) + "/" + year;
    }

    public static boolean isValidBirthdate(String input) {
        String s = input == null ? "" : input.trim();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        try {
            LocalDate date = LocalDate.parse(s, fmt);
            int year = date.getYear();
            return year >= 1900 && year <= 2100;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}