using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DoAn_LTW.ListControl
{
    public partial class DangThucHien : UserControl
    {
        public DangThucHien()
        {
            InitializeComponent();
            this.BackColor = Color.FromArgb(87, 86, 79);
            Label titleLabel = new Label();
            titleLabel.Text = "Đang Thực Hiện";
            titleLabel.Font = new Font("Tahoma", 16, FontStyle.Bold);
            titleLabel.ForeColor = Color.White;
            titleLabel.Height = 50;
            titleLabel.Dock = DockStyle.Top;
            titleLabel.TextAlign = ContentAlignment.MiddleCenter;
            this.Controls.Add(titleLabel);
        }
    }
}
