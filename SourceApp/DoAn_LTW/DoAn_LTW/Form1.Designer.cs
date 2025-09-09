namespace DoAn_LTW
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code
        private void InitializeComponent()
        {
            this.btnDanhSach = new System.Windows.Forms.Button();
            this.btnDangThucHien = new System.Windows.Forms.Button();
            this.btnQuanLy = new System.Windows.Forms.Button();
            this.btnKho = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.titleLabel = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnDanhSach
            // 
            this.btnDanhSach.Location = new System.Drawing.Point(34, 47);
            this.btnDanhSach.Name = "btnDanhSach";
            this.btnDanhSach.Size = new System.Drawing.Size(175, 54);
            this.btnDanhSach.TabIndex = 0;
            this.btnDanhSach.Text = "Danh Sách";
            this.btnDanhSach.UseVisualStyleBackColor = true;
            this.btnDanhSach.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnDangThucHien
            // 
            this.btnDangThucHien.Location = new System.Drawing.Point(34, 158);
            this.btnDangThucHien.Name = "btnDangThucHien";
            this.btnDangThucHien.Size = new System.Drawing.Size(175, 54);
            this.btnDangThucHien.TabIndex = 0;
            this.btnDangThucHien.Text = "Đang Thực Hiện";
            this.btnDangThucHien.UseVisualStyleBackColor = true;
            this.btnDangThucHien.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnQuanLy
            // 
            this.btnQuanLy.Location = new System.Drawing.Point(34, 393);
            this.btnQuanLy.Name = "btnQuanLy";
            this.btnQuanLy.Size = new System.Drawing.Size(175, 54);
            this.btnQuanLy.TabIndex = 0;
            this.btnQuanLy.Text = "Quản Lý";
            this.btnQuanLy.UseVisualStyleBackColor = true;
            this.btnQuanLy.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnKho
            // 
            this.btnKho.Location = new System.Drawing.Point(34, 270);
            this.btnKho.Name = "btnKho";
            this.btnKho.Size = new System.Drawing.Size(175, 54);
            this.btnKho.TabIndex = 0;
            this.btnKho.Text = "Kho";
            this.btnKho.UseVisualStyleBackColor = true;
            this.btnKho.Click += new System.EventHandler(this.button1_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.titleLabel);
            this.panel1.Location = new System.Drawing.Point(249, 12);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1451, 909);
            this.panel1.TabIndex = 1;
            // 
            // titleLabel
            // 
            this.titleLabel.AutoSize = true;
            this.titleLabel.Font = new System.Drawing.Font("Tahoma", 17F, System.Drawing.FontStyle.Bold);
            this.titleLabel.ForeColor = System.Drawing.Color.White;
            this.titleLabel.Location = new System.Drawing.Point(631, 12);
            this.titleLabel.Name = "titleLabel";
            this.titleLabel.Size = new System.Drawing.Size(206, 28);
            this.titleLabel.TabIndex = 0;
            this.titleLabel.Text = "Danh sách Order";
            this.titleLabel.Click += new System.EventHandler(this.label1_Click_1);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(68)))), ((int)(((byte)(68)))), ((int)(((byte)(68)))));
            this.ClientSize = new System.Drawing.Size(1712, 933);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.btnKho);
            this.Controls.Add(this.btnQuanLy);
            this.Controls.Add(this.btnDangThucHien);
            this.Controls.Add(this.btnDanhSach);
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Form1";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }
        #endregion

        private System.Windows.Forms.Button btnDanhSach;
        private System.Windows.Forms.Button btnDangThucHien;
        private System.Windows.Forms.Button btnQuanLy;
        private System.Windows.Forms.Button btnKho;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label titleLabel;
    }
}
