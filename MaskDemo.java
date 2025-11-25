public class MaskDemo {
    public static void main(String[] args) {
        String phone = "31989731734"; // 11 dígitos
        String cpf = "12345678909";
        String cep = "30140071";
        String birth = "15021995"; // ddMMyyyy

        System.out.println("Telefone: " + MaskUtils.formatPhone(phone) + " | válido=" + MaskUtils.isValidPhone(phone));
        System.out.println("CPF: " + MaskUtils.formatCPF(cpf) + " | válido=" + MaskUtils.isValidCPF(cpf));
        System.out.println("CEP: " + MaskUtils.formatCEP(cep) + " | válido=" + MaskUtils.isValidCEP(cep));
        System.out.println("Nascimento: " + MaskUtils.formatBirthdate(birth) + " | válido=" + MaskUtils.isValidBirthdate(MaskUtils.formatBirthdate(birth)));

        if (args.length > 0) {
            System.out.println("\nArgs:");
            for (String a : args) {
                String digits = MaskUtils.onlyDigits(a);
                System.out.println("Entrada='" + a + "' dígitos='" + digits + "'");
                System.out.println("  phone=" + MaskUtils.formatPhone(a) + " valid=" + MaskUtils.isValidPhone(a));
                System.out.println("  cpf=" + MaskUtils.formatCPF(a) + " valid=" + MaskUtils.isValidCPF(a));
                System.out.println("  cep=" + MaskUtils.formatCEP(a) + " valid=" + MaskUtils.isValidCEP(a));
                String bd = MaskUtils.formatBirthdate(a);
                System.out.println("  birth=" + bd + " valid=" + MaskUtils.isValidBirthdate(bd));
            }
        }
    }
}